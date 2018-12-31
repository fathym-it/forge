import { NgModule } from "@angular/core";
import {
  MatGridListModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatTabsModule,
  MatListModule,
  MatAutocompleteModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTooltipModule,
  MatRadioModule,
  MatSnackBarModule
} from "@angular/material";
import { DndModule } from "@beyerleinf/ngx-dnd";

import { FathymSharedModule } from "@lcu/hosting";

import { UIModule } from "../../ui.module";

import { FluxCoreRouterModule, FluxCoreRoutingComponents } from "./flux-core.router";
import { ForgeSolutionsModule } from "@fathym-forge/common";
import { jsPlumbToolkitModule, FluxModule } from "@lcu/flux";
import { CronEditorModule } from 'cron-editor';

var comps = [];

@NgModule({
  imports: [
    FathymSharedModule,
    jsPlumbToolkitModule,
    FluxModule,
    UIModule,
    CronEditorModule,
    FluxCoreRouterModule,
    DndModule,
    ForgeSolutionsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  declarations: [...FluxCoreRoutingComponents, ...comps],
  exports: [...comps],
  entryComponents: [...comps]
})
export class FluxCorePagesModule {}
