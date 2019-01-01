import { NgModule } from '@angular/core';

import { UIModule } from '../../ui.module';

import { MarketplaceRouterModule, RoutingComponents } from './marketplace.router';

@NgModule({
	imports: [
		UIModule,
		//MarketplaceRouterModule,
	],
	declarations: [
		...RoutingComponents,
	],
	exports: [
	],
})
export class MarketplaceModule {
}
