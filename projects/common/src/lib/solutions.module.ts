import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeSolutionsService } from './svc/solutions.service';
import { ForgeWeatherCloudSolutionSolutionModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeDepartureTableModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeApplicationsSolutionModule } from '@lowcodeunit/lcu-sln-applications';

const modules = [
	ForgeWeatherCloudSolutionSolutionModule,
	ForgeDepartureTableModule,
	ForgeApplicationsSolutionModule,
];

@NgModule({
	imports: [
		FathymSharedModule,
		...modules,
	],
	declarations: [
	],
	exports: [
		...modules,
	]
})
export class ForgeSolutionsModule { 
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ForgeSolutionsModule,
			providers: [
				ForgeSolutionsService
			]
		}
	}
}
