import { Component, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { AppsManageAppDialog } from './apps-manage-app.dialog';
import { AppsManageSecurityDialog } from './apps-manage-security.dialog';
import { AppsManageAppDialogConfig, AppsCreateDialogConfig } from './apps.core';
import { from } from 'rxjs';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';
import { AppsCreateDialog } from './apps-create.dialog';
import { ApplicationModel } from 'projects/common/src/lib/core.api';
import { ForgeApplicationsService, PageUIService } from 'projects/common/src/lcu.api';
import { isResultSuccess, BaseModeledResponse } from '@lcu/core';

@Component({
	selector: 'forge-solution-applications-manage',
	templateUrl: './apps-manage.component.html',
	styleUrls: ['./apps-manage.component.scss']
})
export class ForgeApplicationsSolutionManage extends ForgeGenericSolution
	implements ISolutionControl, OnInit {
	//  Fields
	protected origPathGroups: string;

	//  Properties
	public Apps: ApplicationModel[];

	public get HasChanges(): boolean {
		return this.origPathGroups != JSON.stringify(this.PathGroups);
	}

	public Hosts: string[];

	public Loading: boolean;

	public PathGroups: { API: any[][], View: any[][] };

	public SelectedHost: string;

	public SelectedPathGroup: string;

	public SelectedPathGroupIndex: number;

	public ViewType: 'API' | 'View';

	//  Constructors
	constructor(protected injector: Injector, protected appsSvc: ForgeApplicationsService, protected pgUiSvc: PageUIService) {
		super(injector);

		this.PathGroups = <any>{};
	}

	//	Life Cycle
	public ngOnInit() {
		super.ngOnInit();

		this.loadHosts();
	}

	//	API Methods
	public AddNewApp() {
		var dialogRef = this.pgUiSvc.Dialog.Open(AppsCreateDialog, <AppsCreateDialogConfig>{
			Host: this.SelectedHost,
			Path: this.SelectedPathGroup,
			ViewType: this.ViewType
		}, (result) => {
			if (isResultSuccess(result))
				this.loadApps();
		}, '300px');
	}

	public AddNewHost() {
		this.pgUiSvc.Notify.Signal('Ability to add new hosts coming soon');
	}

	public AddNewPathGroup() {
		this.AddNewApp();
	}

	public LoadPathGroupPath(pathGroup: ApplicationModel[]) {
		if (!pathGroup[0].Lookup || !pathGroup[0].Lookup.PathRegex)
			return '/';

		return pathGroup[0].Lookup.PathRegex;
	}

	public ManageApp(app: ApplicationModel): void {
		var dialogRef = this.pgUiSvc.Dialog.Open(AppsManageAppDialog, <AppsManageAppDialogConfig>{
			Application: app,
			AppOptions: this.Apps.filter(a => a != app && a.View && !a.API)
		}, (result: BaseModeledResponse<ApplicationModel>) => {
			if (isResultSuccess(result) && result.Model) {
				app = Object.assign(app, result.Model);
			}
		}, '90%');
	}

	public ManageSecurity(app: ApplicationModel): void {
		var dialogRef = this.pgUiSvc.Dialog.Open(AppsManageSecurityDialog, app, (result: BaseModeledResponse<ApplicationModel>) => {
			if (isResultSuccess(result) && result.Model) {
				app.Security = result.Model.Security;

				app.Lookup = result.Model.Lookup;
			}
		}, '300px');
	}

	public ManageHost(host: string) {
		this.SelectedHost = host;

		if (this.SelectedHost)
			this.loadApps();
		else
			this.Apps = [];
	}

	public ManagePathGroup(pathGroup: ApplicationModel[], index: number) {
		this.SelectedPathGroupIndex = index;

		if (pathGroup)
			this.SelectedPathGroup = this.LoadPathGroupPath(pathGroup);
		else
			this.SelectedPathGroup = null;
	}

	public SaveChanges(): void {
		this.Loading = true;

		var apps: ApplicationModel[] = [];

		var pathGroups = [...this.PathGroups.API, ...this.PathGroups.View].reverse();

		pathGroups.forEach(pg => {
			var pgApps = pg.reverse();

			apps = [...apps, ...pgApps];
		});

		var priority = 500;

		apps.forEach(app => {
			app.Priority = priority;

			if (!app.Hosts)
				app.Hosts = [];

			if (app.Hosts.indexOf(this.SelectedHost) < 0)
				app.Hosts.push(this.SelectedHost);

			priority += 500;
		});

		this.Apps = apps;

		this.appsSvc.SaveAll(this.Apps).subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.loadApps();
				} else {
					console.log(result);

					this.Loading = false;
				}
			},
			(err) => {
				console.log(err);

				this.Loading = false;
			},
			() => {
			});
	}

	//	Helpers
	protected calculatePathGroups(setOrig: boolean) {
		var apps = from(this.Apps);

		var pathGroups = apps.pipe(
			groupBy((app) => app.Lookup && app.Lookup.PathRegex ? app.Lookup.PathRegex : '/'),
			mergeMap(group => group.pipe(toArray()))
		);

		this.PathGroups.API = [];

		this.PathGroups.View = [];

		pathGroups.subscribe(pgs => {
			var viewType = pgs[0]['API'] ? 'API' : 'View';

			this.PathGroups[viewType].push(pgs);
		});

		if (setOrig)
			this.origPathGroups = JSON.stringify(this.PathGroups);
	}

	protected loadApps() {
		this.Loading = true;

		this.appsSvc.ListApps(this.SelectedHost, 1, 1000).subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.Apps = result.Model.Items;

					this.calculatePathGroups(true);
				} else {
					//	TODO:  Handle error
					this.Apps = [];
				}
			},
			(err) => {
				this.Apps = [];
			},
			() => {
				this.Loading = false;
			});
	}

	protected loadHosts() {
		this.Loading = true;

		this.appsSvc.ListHosts().subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.Hosts = result.Model;
				} else {
					//	TODO:  Handle error
				}
			},
			(err) => {
			},
			() => {
				this.Loading = false;
			});
	}
}
