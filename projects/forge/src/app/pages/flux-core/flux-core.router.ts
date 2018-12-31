import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { FluxCoreLayoutComponent } from './flux-core.layout';
import { MachineLearningComponent } from './analytics/machine-learning';
import { DataMapComponent } from './common/data-map';
import { DeviceManagerComponent } from './dev/device-manager';
import { StaticDataStreamerComponent } from './dev/static-data-streamer';
import { DataStreamComponent } from './input/data-stream';
import { DeviceStreamComponent } from './input/device-stream';
import { MasterDataComponent } from './input/master-data';
import { BinaryStorageComponent } from './output/binary-storage';
import { FathymServerComponent } from './output/fathym-server';
import { QueryableStorageComponent } from './output/queryable-storage';
import { VisualizationsComponent } from './output/visualizations';

export const FluxCoreRoutes: Routes = [
	{
		path: "",
		component: FluxCoreLayoutComponent,
		data: {},
		children: [
      {
        path: "analytics/machine-learning",
        component: MachineLearningComponent
      },
      {
        path: "common/data-map",
        component: DataMapComponent
      },
      {
        path: "dev/device-manager",
        component: DeviceManagerComponent
      },
      {
        path: "dev/static-data-streamer",
        component: StaticDataStreamerComponent
      },
      {
        path: "input/data-stream",
        component: DataStreamComponent
      },
      {
        path: "input/device-stream",
        component: DeviceStreamComponent
      },
      {
        path: "input/master-data",
        component: MasterDataComponent
      },
      {
        path: "output/binary-storage",
        component: BinaryStorageComponent
      },
      {
        path: "output/fathym-server",
        component: FathymServerComponent
      },
      {
        path: "output/queryable-storage",
        component: QueryableStorageComponent
      },
      {
        path: "output/visualizations",
        component: VisualizationsComponent
      },
		]
	}
];

export var FluxCoreRoutingComponents: any[] = [
	FluxCoreLayoutComponent,
	MachineLearningComponent,
	DataMapComponent,
	DeviceManagerComponent,
	StaticDataStreamerComponent,
	DataStreamComponent,
	DeviceStreamComponent,
	MasterDataComponent,
	BinaryStorageComponent,
	FathymServerComponent,
	QueryableStorageComponent,
	VisualizationsComponent,
];

@NgModule({
	imports: [
		RouterModule.forChild(FluxCoreRoutes)
	],
	declarations: [
	],
	exports: [
		RouterModule,
	],
})
export class FluxCoreRouterModule {
}
