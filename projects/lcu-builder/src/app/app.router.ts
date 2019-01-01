import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { BuilderPage } from './pages/builder.page';

const routes: Routes = [
	{
		path: '**',
		component: BuilderPage,
		runGuardsAndResolvers: 'always'
	},
];

export var RoutingComponents: any[] = [
	BuilderPage,
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
