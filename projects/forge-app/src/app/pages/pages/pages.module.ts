import { NgModule } from '@angular/core';
import { MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { DndModule } from '@beyerleinf/ngx-dnd';

import { FathymSharedModule } from '@lcu/hosting';

import { UIModule } from '../../ui.module';

import { PagesRouterModule, RoutingComponents } from './pages.router';
import { ComponentSelectorModule } from '@lcu/daf-ui';
import { ForgeBuildersModule } from '@fathym-forge/common/lcu.api';

var comps = [
];

@NgModule({
	imports: [
		FathymSharedModule,
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
