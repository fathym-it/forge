import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { PagesLayoutComponent } from './pages.layout';
import { OverviewPage } from './overview.page';
import { ViewPage } from './view.page';
import { CreatePage } from './create.page';

export const PagesRoutes: Routes = [
	{
		path: "",
		component: PagesLayoutComponent,
		data: {},
		children: [
			{
				path: "page/create",
				component: CreatePage,
				data: {}
			},
			{
				path: "page/:lookup",
				component: ViewPage,
				data: {}
			},
			{
				path: "overview",
				component: OverviewPage,
				data: {}
			},
			{
				path: "",
				redirectTo: "overview",
				pathMatch: 'full'
			},
		]
	}
];

export var RoutingComponents: any[] = [
	PagesLayoutComponent,
	OverviewPage,
	ViewPage,
	CreatePage,
];

@NgModule({
	imports: [
		RouterModule.forChild(PagesRoutes)
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class PagesRouterModule {
}
