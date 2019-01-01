import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';

import { UIModule } from '../../ui.module';

import { PublicRouterModule, RoutingComponents } from './public.router';

@NgModule({
	imports: [
		FathymSharedModule,
		UIModule,
		//PublicRouterModule,
	],
	declarations: [
		...RoutingComponents,
	],
	exports: [
	],
})
export class PublicModule {
}
