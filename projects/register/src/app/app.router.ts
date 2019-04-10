import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { RegisterComponent } from './pages/register';

const routes: Routes = [
	{
		path: "**",
		component: RegisterComponent
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
