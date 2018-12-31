import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { FluxLayoutComponent } from './flux.layout';
import { FluxComponent } from './flux';

export const FluxRoutes: Routes = [
	{
    path: "",
    component: FluxLayoutComponent,
    data: {},
    children: [
      {
        path: "manage/:id",
        component: FluxComponent
      },
    ]
  }
];

export var FluxRoutingComponents: any[] = [
	FluxLayoutComponent,
	FluxComponent,
];

@NgModule({
	imports: [
		RouterModule.forChild(FluxRoutes)
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class FluxRouterModule {
}
