import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { ViewPage } from './pages/view.page';

const routes: Routes = [
	{
		path: '**',
		component: ViewPage,
		runGuardsAndResolvers: 'always'
	},
];

export var RoutingComponents: any[] = [
	ViewPage,
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class AppRouterModule {
}
