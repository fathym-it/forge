import { Component, ViewChild } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { MatButtonToggleGroup } from '@angular/material';
import { ForgeSettings } from '@lcu/apps';
import { ForgeSettingsContext } from '@lcu/daf-common';

@Component({
	selector: 'settings-pages',
	templateUrl: './settings.page.html',
	styleUrls: ['./settings.page.scss']
})
export class SettingsPage {
	//	Properties
	@ViewChild("azureGroup")
	public AzureGroup: MatButtonToggleGroup;

	public Loading: boolean;

	public Settings: ForgeSettings;

	public StyleEditorOptions: NgxEditorModel;

	//	Constructors
	constructor(protected forgeSettings: ForgeSettingsContext) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.forgeSettings.Loading.subscribe(loading => {
			this.Loading = loading;
		});

		this.forgeSettings.Context.subscribe(settings => {
			this.Settings = settings;
		});

		this.StyleEditorOptions = <NgxEditorModel>{
			//theme: 'vs-dark',
			language: 'scss'
		};
	}

	//	API Methods
	public Save() {
		this.forgeSettings.Save(this.Settings).subscribe();
	}

	//	Helpers
}
