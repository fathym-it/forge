import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FathymSharedModule } from '@lcu/hosting';

import { DndModule } from '@beyerleinf/ngx-dnd';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AppRouterModule, RoutingComponents } from './app.router';

import { UIModule } from './ui.module';

import { AppLayoutComponent } from './app.layout';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ForgeBuildersModule } from '@fathym-forge/common';
import { WeatherCloudCommonModule } from '@weather-cloud/common';
import { HttpClientModule } from '@angular/common/http';
import { FluxModule } from '@lcu/flux';
import { AmModule } from '@acaisoft/angular-azure-maps';

export let modules: any[] = [FathymSharedModule, AppRouterModule];

@NgModule({
	imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    UIModule.forRoot(),
    DndModule,
    MonacoEditorModule.forRoot(),
    ForgeBuildersModule.forRoot(),
    AmModule.forRoot(),
    Angulartics2Module.forRoot(),
    WeatherCloudCommonModule.forRoot(),
    FluxModule.forRoot(),
    ...modules
	],
	declarations: [
		...RoutingComponents,
		AppLayoutComponent,
	],
	exports: [
		...modules,
	],
	providers: [
	],
	entryComponents: [
	]
})
export class CoreModule {
	public static LoadBootstrap(): any {
		return AppLayoutComponent;
	}
}
