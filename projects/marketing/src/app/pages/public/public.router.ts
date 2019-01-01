import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { PublicLayoutComponent } from './public.layout';

import { HomeComponent } from './home';

import { LearnComponent } from './learn';

import { PageNotFoundComponent } from './page-not-found';

import { SignInComponent } from './sign-in';

import { SolutionsComponent } from './solutions';

const routes: Routes = [
	{
		path: "",
		component: PublicLayoutComponent,
		data: {},
		children: [
			{
				path: "learn",
				component: LearnComponent,
				data: {}
			},
			{
				path: "marketplace",
				loadChildren: '../marketplace/marketplace.module#MarketplaceModule',
			},
			{
				path: "sign-in",
				component: SignInComponent,
				data: {}
			},
			{
				path: "solutions",
				component: SolutionsComponent,
				data: {}
			},
			{
				path: "",
				component: HomeComponent,
				data: {}
			},
			{
				path: "**",
				component: PageNotFoundComponent,
				data: {}
			},
		]
	}
];

export var RoutingComponents: any[] = [
	PublicLayoutComponent,
	HomeComponent,
	LearnComponent,
	PageNotFoundComponent,
	SignInComponent,
	SolutionsComponent,
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
export class PublicRouterModule {
}
