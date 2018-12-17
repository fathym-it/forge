import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckboxChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppsManageAppDialogConfig } from './apps.core';
import { ApplicationModel, ApplicationAPIProxySetup } from 'projects/common/src/lib/core.api';
import { ForgeApplicationsService } from 'projects/common/src/lcu.api';
import { isResultSuccess, BaseModeledResponse } from '@lcu/core';
import { Status } from '@lcu/common';

@Component({
	selector: 'applications-manage-app-dialog',
	templateUrl: './apps-manage-app.dialog.html',
	styleUrls: ['./apps-manage-app.dialog.scss']
})
export class AppsManageAppDialog implements OnInit {
	//	Properties
	public ActiveApplicationType: 'API' | 'View';

	public Application: ApplicationModel;

	public AppOptions: ApplicationModel[];

	public EditAppInfo: boolean;

	public Error: string;

	public Loading: boolean;

	public NewProxyFrom: string;

	public NewProxyTo: string;

	public ProxyApplicationName: string;

	public ProxyServiceNames: string[];

	public ViewApplicationType: 'AppBuilder' | 'Custom' | 'AppDisplay' | 'Flow' | 'FlowCore' | 'Forge' | 'Marketing' | 'NoEnt' | 'Register' | 'SignIn';

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<AppsManageAppDialog>, @Inject(MAT_DIALOG_DATA) protected data: AppsManageAppDialogConfig,
		protected appsSvc: ForgeApplicationsService) {
		this.Application = JSON.parse(JSON.stringify(data.Application));

		this.AppOptions = data.AppOptions;

		if (!this.Application.Security)
			this.Application.Security = <any>{};

		if (!this.Application.Lookup)
			this.Application.Lookup = <any>{};
	}

	//	Life Cycle
	public ngOnInit() {
		this.loadApplicationServices();

		if (this.Application.View) {
			this.ActiveApplicationType = 'View';

			if (!this.Application.View.Google)
				this.Application.View.Google = <any>{};

			if (!this.Application.View.BaseHref && this.Application.Lookup)
				this.Application.View.BaseHref = this.Application.Lookup.PathRegex
		} else if (this.Application.API) {
			this.ActiveApplicationType = 'API';
		}

		this.determineViewApplicationType();
	}

	//	API Methods
	public AddProxy(from: string, to: string) {
		if ((from || to) && (from != '' || to != '')) { 
			this.Application.API.Proxies = this.Application.API.Proxies ?
				[<ApplicationAPIProxySetup>{ From: from, To: to }, ...this.Application.API.Proxies] : [<ApplicationAPIProxySetup>{ From: from, To: to }];

			this.NewProxyFrom = '';

			this.NewProxyTo = '';
		}
	}

	public DeleteApplication() {
		if (this.Application && confirm(`Are you sure you want to delete the application '${this.Application.Name}'?`)) {
			this.Loading = true;

			this.Error = null;

			this.appsSvc.Delete(this.Application.ID).subscribe(
				(result) => {
					if (isResultSuccess(result)) {
						this.dialogRef.close(<BaseModeledResponse<ApplicationModel>>{
							Model: this.Application,
							Status: result.Status
						});
					} else {
						this.Error = result.Status.Message;

						this.Loading = false;
					}
				},
				(err) => {
					this.Loading = false;
				},
				() => {
				});
		}
	}

	public HandleProxyChange(event: MatCheckboxChange) {
		if (event.checked && !this.Application.Proxy) {
			this.Application.Proxy = {
				Application: this.ProxyApplicationName,
				Service: ''
			};
		} else if (!event.checked) {
			this.Application.Proxy = null;
		}
	}

	public OpenAppBuilder() {
		this.Loading = true;

		this.Error = null;

		this.appsSvc.SetAppBuilder(true).subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					window.open(this.Application.View.BaseHref, '_blank');

					this.Loading = false;
				} else {
					this.Loading = false;

					this.Error = result.Status.Message;
				}
			});
	}

	public RemoveProxy(proxy: ApplicationAPIProxySetup) {
		this.Application.API.Proxies = this.Application.API.Proxies.filter(p => p.From != proxy.From && p.To != proxy.To);
	}

	public SaveApplication() {
		this.Loading = true;

		this.Error = null;

		if (this.ActiveApplicationType == 'API') {
			this.Application.View = null;
		} else if (this.ActiveApplicationType == 'View') {
			this.Application.API = null;

			if (this.Application.Lookup && this.Application.Lookup.Claims)
				this.Application.Lookup.Claims = this.Application.Lookup.Claims.filter(c => c.Type != 'DAF:ApplicationBuilder');

			switch (this.ViewApplicationType) {
				case 'AppBuilder':
					this.Application.View.ApplicationName = 'app-builder';

					this.Application.View.FilesRoot = '/apps/app-builder';

					if (!this.Application.Lookup)
						this.Application.Lookup = <any>{};

					if (!this.Application.Lookup.Claims)
						this.Application.Lookup.Claims = [];

					this.Application.Lookup.Claims.push({
						CheckWithout: false,
						Type: 'DAF:ApplicationBuilder',
						Values: ['True', 'true']
					});

					break;

				case 'AppDisplay':
					this.Application.View.ApplicationName = 'app-display';

					this.Application.View.FilesRoot = '/apps/app-display';

					break;

				case 'Flow':
					this.Application.View.ApplicationName = 'flow';

					this.Application.View.FilesRoot = '/flow';

					break;

				case 'FlowCore':
					this.Application.View.ApplicationName = 'flow-core';

					this.Application.View.FilesRoot = '/flow-core';

					break;

				case 'Forge':
					this.Application.View.ApplicationName = 'forge';

					this.Application.View.FilesRoot = '/forge';

					break;

				case 'Marketing':
					this.Application.View.ApplicationName = 'marketing';

					this.Application.View.FilesRoot = '/marketing';

					break;

				//case 'NoEnt':
				//	this.Application.View.ApplicationName = 'no-ent';

				//	this.Application.View.FilesRoot = '/apps/no-ent';

				//	break;

				case 'Register':
					this.Application.View.ApplicationName = 'register';

					this.Application.View.FilesRoot = '/apps/register';

					break;

				case 'SignIn':
					this.Application.View.ApplicationName = 'sign-in';

					this.Application.View.FilesRoot = '/apps/sign-in';

					break;

				default:
				case 'Custom':
					break;
			}

			if (this.ViewApplicationType && this.ViewApplicationType != 'Custom')
				this.Application.Proxy = {
					Application: 'Fathym.Forge.Web.Fabric',
					Service: 'Fathym.Forge.Web'
				};
		}

		if (!this.Application.Lookup.PathRegex && !this.Application.Lookup.QueryRegex && !this.Application.Lookup.UserAgentRegex &&
			!this.Application.Lookup.Claims && !this.Application.Lookup.RoleSets)
			this.Application.Lookup = null;

		this.dialogRef.close(<BaseModeledResponse<ApplicationModel>>{
			Model: this.Application,
			Status: <Status>{
				Code: 0,
				Message: 'Success'
			}
		});
	}

	//	Helpers
	protected determineViewApplicationType() {
		this.ViewApplicationType = null;

		if (this.Application.Proxy &&
			this.Application.Proxy.Application == 'Fathym.Forge.Web.Fabric' && this.Application.Proxy.Service == 'Fathym.Forge.Web') {
			if (this.Application.View.FilesRoot == '/apps/no-ent')
				this.ViewApplicationType = 'NoEnt';
			else if (this.Application.View.FilesRoot == '/apps/app-builder')
				this.ViewApplicationType = 'AppBuilder';
			else if (this.Application.View.FilesRoot == '/apps/app-display')
				this.ViewApplicationType = 'AppDisplay';
			else if (this.Application.View.FilesRoot == '/forge')
				this.ViewApplicationType = 'Forge';
			else if (this.Application.View.FilesRoot == '/flow')
				this.ViewApplicationType = 'Flow';
			else if (this.Application.View.FilesRoot == '/flow-core')
				this.ViewApplicationType = 'FlowCore';
			else if (this.Application.View.FilesRoot == '/marketing')
				this.ViewApplicationType = 'Marketing';
			else if (this.Application.View.FilesRoot == '/apps/register')
				this.ViewApplicationType = 'Register';
			else if (this.Application.View.FilesRoot == '/apps/sign-in')
				this.ViewApplicationType = 'SignIn';
		}

		if (!this.ViewApplicationType)
			this.ViewApplicationType = 'Custom';
	}

	protected loadApplicationServices() {
		this.appsSvc.ListFabricApplicationServices().subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.ProxyApplicationName = result.Model.ApplicationName;

					this.ProxyServiceNames = result.Model.ServiceNames;
				} else {
					console.log(result.Status.Message);
				}
			},
			(err) => { },
			() => {
				this.Loading = false;
			});
	}
}
