import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { ConfigureComponent } from './pages/configure';

import { OverviewComponent } from './pages/overview';

const routes: Routes = [
	{
		path: "configure",
		component: ConfigureComponent
	},
	{
		path: "**",
		component: OverviewComponent
	},
];

export var RoutingComponents: any[] = [
	ConfigureComponent,
	OverviewComponent
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
