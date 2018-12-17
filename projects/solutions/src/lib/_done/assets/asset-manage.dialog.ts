import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgeAssetsSolutionManageDataDialogConfig, ForgeAssetsSolutionManageDataDialogResult } from './assets.core';
import { Loading, BaseModeledResponse, isResultSuccess } from '@lcu/core';
import { JSONSchemaMap, ForgeJSONSchema } from 'projects/common/src/lib/core.api';
import { ForgeJSONSchemaService } from 'projects/common/src/lcu.api';
import { Status } from '@lcu/common';

@Component({
	selector: 'asset-manage-dialog',
	templateUrl: './asset-manage.dialog.html',
	styleUrls: ['./asset-manage.dialog.scss']
})
export class ForgeAssetsSolutionManageDataDialog implements OnInit {
	//	Fields

	//	Properties
	public Config: ForgeAssetsSolutionManageDataDialogConfig;

	public Data: any;

	public Error: string;

	public Loading: Loading;

	public SchemaMap: JSONSchemaMap;

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<ForgeAssetsSolutionManageDataDialog>,
		@Inject(MAT_DIALOG_DATA) config: ForgeAssetsSolutionManageDataDialogConfig, protected schemaSvc: ForgeJSONSchemaService) {
		this.Config = JSON.parse(JSON.stringify(config));

		this.Data = {};

		this.Loading = new Loading();
	}

	//	Life Cycle
	public ngOnInit() {
		this.loadJsonSchemaMap();
	}

	//	API Methods
	public Cancel() {
		this.dialogRef.close(<BaseModeledResponse<ForgeAssetsSolutionManageDataDialogResult>>{
			Model: null,
			Status: <Status>{
				Code: 1,
				Message: 'Cancelled'
			}
		});
	}

	public PivotProperties() {
		if (!this.SchemaMap)
			return [];

		var keys = Object.keys(this.SchemaMap.Schema.properties);

		return keys.map(k => this.SchemaMap.Schema.properties[k]);
	}

	public Save(propData: any) {
		var data = this.wrapProperties(propData);

		this.dialogRef.close(<BaseModeledResponse<ForgeAssetsSolutionManageDataDialogResult>>{
			Model: { Data: data },
			Status: <Status>{ Code: 0, Message: 'Success' }
		});
	}

	//	Helpers
	protected loadJsonSchemaMap() {
		if (this.Config.AssetTypeConfig.SchemaID) {
			this.Loading.Set(true);

			this.schemaSvc.Get(this.Config.AssetTypeConfig.SchemaID)
				.subscribe(
					(schemaResult) => {
						if (isResultSuccess(schemaResult)) {
							this.SchemaMap = schemaResult.Model;

							this.Data = this.unwrapProperties(this.Config.Data);
						} else if (schemaResult.Status.Code == 2) {
							this.SchemaMap = <JSONSchemaMap>{
								Schema: <ForgeJSONSchema>{}
							};
						} else {
							console.log(schemaResult);

							this.Error = schemaResult.Status.Message;
						}
					},
					(error: any) => {
						console.log(error);

						this.Error = error;
					},
					() => {
						this.Loading.Set(false);
					});
		} else {
			this.SchemaMap = <JSONSchemaMap>{
				Schema: <ForgeJSONSchema>{}
			};
		}
	}

	protected unwrapProperties(data: any) {
		var props = this.PivotProperties();

		var propData = {};

		for (var i = 0; i < props.length; i++) {
			var prop = props[i];

			propData[i] = data[prop.title];
		}

		return propData;
	}

	protected wrapProperties(propData: any) {
		var props = this.PivotProperties();

		var data = {};

		for (var i = 0; i < props.length; i++) {
			var prop = props[i];

			data[prop.title] = propData[i];
		}

		if (this.Config.Data['ID'])
			data['ID'] = this.Config.Data['ID'];
		else if (this.Config.Data['id'])
			data['id'] = this.Config.Data['id'];

		return data;
	}
}
