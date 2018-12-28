import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { SignInComponent } from './pages/sign-in';

const routes: Routes = [
	{
		path: "**",
		component: SignInComponent
	},
];

export var RoutingComponents: any[] = [
	SignInComponent,
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
