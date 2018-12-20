import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { PagesModule } from './pages/pages/pages.module';
import { SolutionsModule } from './pages/solutions/solutions.module';
import { SettingsPage } from './pages/settings.page';

export function loadPagesModule() {
	return PagesModule;
}

export function loadSolutionsModule() {
	return SolutionsModule;
}

const routes: Routes = [
	{
		path: 'settings',
		component: SettingsPage
	},
	{
		path: 'solutions',
		loadChildren: './pages/solutions/solutions.module#SolutionsModule'
	},
	{
		path: '',
		loadChildren: './pages/pages/pages.module#PagesModule'
	},
];

export var RoutingComponents: any[] = [
	SettingsPage
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
		SolutionsModule,
		PagesModule,
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class AppRouterModule {
}
