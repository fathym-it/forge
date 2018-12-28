import { NgModule } from '@angular/core';
import { MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { DndModule } from '@beyerleinf/ngx-dnd';

import { FathymSharedModule } from '@lcu/hosting';

import { UIModule } from '../../ui.module';

import { PagesRouterModule, RoutingComponents } from './pages.router';
import { ComponentSelectorModule, PageViewModule } from '@lcu/daf-ui';
import { ForgeBuildersModule } from '@fathym-forge/common';

var comps = [
];

@NgModule({
	imports: [
		FathymSharedModule,
		PageViewModule,
		UIModule,
		PagesRouterModule,
		DndModule,
		ComponentSelectorModule,
		ForgeBuildersModule,
		MatButtonModule,
		MatFormFieldModule,
		MatGridListModule,
		MatIconModule,
    MatInputModule,
    MatListModule,
		MatMenuModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatToolbarModule,
	],
	declarations: [
		...RoutingComponents,
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class PagesModule {
}
