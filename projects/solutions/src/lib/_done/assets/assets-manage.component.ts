import { Component, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { ForgeAssetsSolutionCreateDialog } from './assets-create.dialog';
import { ForgeAssetsSolutionSettingsDialog } from './assets-settings.dialog';
import { Subscription } from 'rxjs';
import { ForgeAssetsSolutionManageDataDialog } from './asset-manage.dialog';
import { ForgeAssetsSolutionManageDataDialogConfig, ForgeAssetsSolutionManageDataDialogResult } from './assets.core';
import { AssetTypeContext, EnterpriseAssetsConfig, AssetsConfigContext, SingletonService } from '@lcu/enterprises';
import { DataFlowContext, PageUIService, DatabaseService } from 'projects/common/src/lcu.api';
import { Loading, BaseModeledResponse, isResultSuccess } from '@lcu/core';
import { EnterpriseAssetTypeConfig } from '@lcu/enterprises/lib/enterprise-asset-type-config';
import { DataSetQuery } from 'projects/common/src/lib/core.api';

@Component({
	selector: 'forge-solution-assets-manage',
	templateUrl: './assets-manage.component.html',
	styleUrls: ['./assets-manage.component.scss']
})
export class ForgeAssetsSolutionManage extends ForgeGenericSolution
	implements ISolutionControl {
	//  Fields
	protected assetTypeConfig: AssetTypeContext;

	protected assetTypeSub: Subscription;

	protected dataSub: Subscription;

	//  Properties
	public AssetsConfig: EnterpriseAssetsConfig;

	public AssetTypeConfig: EnterpriseAssetTypeConfig;

	public Flow: DataFlowContext<any>;

	public ManageDataType: string;

	public Loading: Loading;

	//  Constructors
	constructor(protected assetsConfig: AssetsConfigContext, protected pgUiSvc: PageUIService,
		protected dbSvc: DatabaseService, protected configSvc: SingletonService, protected injector: Injector) {
		super(injector);

		this.Loading = new Loading();
	}

	//	Life Cycle
	public ngOnInit() {
		super.ngOnInit();

		this.assetsConfig.Loading.subscribe(loading => {
			this.Loading.Set(loading);
		});

		this.assetsConfig.Context.subscribe(config => {
			this.AssetsConfig = config;
		});
	}

	public ngOnDestroy() {
		if (this.assetTypeSub)
			this.assetTypeSub.unsubscribe();

		if (this.dataSub)
			this.dataSub.unsubscribe();
	}

	//	API Methods
	public CreateData() {
		if (this.AssetTypeConfig)
			this.pgUiSvc.Dialog.Open(ForgeAssetsSolutionManageDataDialog, <ForgeAssetsSolutionManageDataDialogConfig>{
				AssetTypeConfig: this.AssetTypeConfig,
				Data: {}
			}, (result: BaseModeledResponse<ForgeAssetsSolutionManageDataDialogResult>) => {
				if (isResultSuccess(result)) {
					this.Flow.Insert(result.Model.Data);

					this.Flow.Sync().subscribe();
				}
			}, "90%");
	}

	public CreateNewDataType() {
		this.pgUiSvc.Dialog.Open(ForgeAssetsSolutionCreateDialog, {},
			(result) => {
				if (isResultSuccess(result) && this.AssetsConfig.DataTypes) {
					if (!this.AssetsConfig.DataTypes.some(dt => dt == result.Model)) {
						this.AssetsConfig.DataTypes.push(result.Model);

						this.assetsConfig.Save(this.AssetsConfig).subscribe(status => {
							this.ManageData(result.Model);
						});
					} else {
						this.pgUiSvc.Notify.Signal(`The data type ${result.Model} already exists.`);
					}
				}
			});
	}

	public DeleteData(data: any) {
		if (confirm('Are you sure you want to delete the data?')) {
			this.Flow.Remove(data);

			this.Flow.Sync().subscribe();
		}
	}

	public EditData(data: any) {
		if (this.AssetTypeConfig)
			this.pgUiSvc.Dialog.Open(ForgeAssetsSolutionManageDataDialog, <ForgeAssetsSolutionManageDataDialogConfig>{
				AssetTypeConfig: this.AssetTypeConfig,
				Data: data
			}, (result: BaseModeledResponse<ForgeAssetsSolutionManageDataDialogResult>) => {
				if (isResultSuccess(result)) {
					this.Flow.Update(result.Model.Data);

					this.Flow.Sync().subscribe();
				}
			}, "90%");
	}

	public ManageData(type: string) {
		if (type && this.ManageDataType != type) {
			this.ManageDataType = type;

			this.Flow = new DataFlowContext({
				Query: <DataSetQuery>{
				},
				Sorting: null,
				Type: this.ManageDataType
			}, this.dbSvc);

			this.Flow.Loading.subscribe(loading => {
				this.Loading.Set(loading);
			});

			this.dataSub = this.Flow.Data.subscribe(data => {
			});

			this.assetTypeConfig = new AssetTypeContext(this.ManageDataType, this.configSvc);

			this.assetTypeConfig.Loading.subscribe(loading => {
				this.Loading.Set(loading);
			});

			this.assetTypeSub = this.assetTypeConfig.Context.subscribe(config => {
				this.AssetTypeConfig = config;
			});
		} else {
			this.ManageDataType = null;

			this.dataSub.unsubscribe();

			this.Flow = null;

			this.assetTypeSub.unsubscribe();

			this.AssetTypeConfig = null;
		}
	}

	public ManageDataTypeSettings(type: string) {
		if (this.AssetTypeConfig)
			this.pgUiSvc.Dialog.Open(ForgeAssetsSolutionSettingsDialog, this.AssetTypeConfig || {},
				(result) => {
					if (isResultSuccess(result)) {
						this.AssetTypeConfig = Object.assign(this.AssetTypeConfig || {}, result.Model);

						this.assetTypeConfig.Save(this.AssetTypeConfig).subscribe();
					}
				}, "90%");
	}

	//	Helpers
}
