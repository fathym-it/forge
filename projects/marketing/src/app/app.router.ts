import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { RegisterComponent } from './pages/register';

import { PublicLayoutComponent } from './pages/public/public.layout';

import { HomeComponent } from './pages/public/home';

import { LearnComponent } from './pages/public/learn';

import { PageNotFoundComponent } from './pages/public/page-not-found';

import { SignInComponent } from './pages/public/sign-in';

import { SolutionsComponent } from './pages/public/solutions';

import { MarketplaceLayoutComponent } from './pages/marketplace/marketplace.layout';

import { OverviewComponent } from './pages/marketplace/overview';

import { EcosystemComponent } from './pages/marketplace/ecosystem';

const routes: Routes = [
	{
		path: "register",
		component: RegisterComponent,
		data: {}
	},
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
				path: "marketplace",
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
	},
];

export var RoutingComponents: any[] = [
	RegisterComponent,
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class AppRouterModule {
}
