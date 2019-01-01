import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { MarketplaceLayoutComponent } from './marketplace.layout';

import { OverviewComponent } from './overview';

import { EcosystemComponent } from './ecosystem';

const routes: Routes = [
	{
		path: "",
		component: MarketplaceLayoutComponent,
		data: {},
		children: [
			{
				path: ":ecosystem",
				component: EcosystemComponent,
				data: {}
			},
			{
				path: "",
				component: OverviewComponent,
				data: {}
			}
		]
	}
];

export var RoutingComponents: any[] = [
	MarketplaceLayoutComponent,
	OverviewComponent,
	EcosystemComponent,
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class MarketplaceRouterModule {
}
