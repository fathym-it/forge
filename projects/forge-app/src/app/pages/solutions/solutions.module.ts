import { NgModule } from '@angular/core';
import { MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTabsModule, MatListModule } from '@angular/material';
import { DndModule } from '@beyerleinf/ngx-dnd';

import { FathymSharedModule } from '@lcu/hosting';

import { UIModule } from '../../ui.module';

import { SolutionsRouterModule, SolutionsRoutingComponents } from './solutions.router';
import { ForgeSolutionsModule } from '@fathym-forge/common';
import { PageViewModule } from '@lcu/daf-ui';

var comps = [
];

@NgModule({
	imports: [
		FathymSharedModule,
		UIModule,
		SolutionsRouterModule,
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
	],
	declarations: [
		...SolutionsRoutingComponents,
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class SolutionsModule {
}
