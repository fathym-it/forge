import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { FathymSharedModule } from "@lcu/hosting";

import { DndModule } from "@beyerleinf/ngx-dnd";

import { Angulartics2Module } from "angulartics2";

import { AppRouterModule, RoutingComponents } from "./app.router";

import { UIModule } from "./ui.module";

import { AppLayoutComponent } from "./app.layout";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { HttpClientModule } from "@angular/common/http";
import { ForgeBuildersModule } from "@fathym-forge/common";
import { FluxModule } from "@lcu/flux";
import { WeatherCloudCommonModule } from '@weather-cloud/common';
import { AmModule } from '@acaisoft/angular-azure-maps';
import { DynamicWizardModule } from '@lcu-ide/dynamic-wizard-common';
import { ProvisioningWizardComponent } from './pages/flux/provisioning-wizard.component';
import { ProvisioningWizardService } from './pages/flux/provisioning-wizard.service';

export var modules: any[] = [FathymSharedModule, AppRouterModule];

@NgModule({
  imports: [
    BrowserModule,
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
    DynamicWizardModule,
    ...modules
  ],
  declarations: [...RoutingComponents, AppLayoutComponent, ProvisioningWizardComponent],
  exports: [...modules],
  providers: [ProvisioningWizardService],
  entryComponents: [ProvisioningWizardComponent]
})
export class CoreModule {
  public static LoadBootstrap(): any {
    return AppLayoutComponent;
  }
}
