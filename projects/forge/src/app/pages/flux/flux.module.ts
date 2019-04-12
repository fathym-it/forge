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
  MatSnackBarModule,
  MatDialogModule
} from "@angular/material";
import { DndModule } from "@beyerleinf/ngx-dnd";

import { FathymSharedModule } from "@lcu/hosting";

import { UIModule } from "../../ui.module";

import { FluxRouterModule, FluxRoutingComponents } from "./flux.router";
import { ForgeSolutionsModule } from "@fathym-forge/common";
import { jsPlumbToolkitModule, FluxModule } from "@lcu/flux";

var comps = [];

@NgModule({
  imports: [
    FathymSharedModule,
    jsPlumbToolkitModule,
    FluxModule,
    UIModule,
    FluxRouterModule,
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
    MatDialogModule
  ],
  declarations: [...FluxRoutingComponents, ...comps],
  exports: [...comps],
  entryComponents: [...comps]
})
export class FluxPagesModule {}
