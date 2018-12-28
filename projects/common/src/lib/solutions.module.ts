import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeSolutionsService } from './svc/solutions.service';
import { ForgeWeatherCloudSolutionModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeApplicationsSolutionModule } from '@lcu/lcu-sln-applications';
import { ForgeAssetsSolutionModule } from '@lcu/lcu-sln-assets';
import { ForgeDevicesSolutionModule } from '@lcu/lcu-sln-devices';
import { ForgeDashboardsSolutionModule } from '@lcu/lcu-sln-dashboards';
import { ForgeIdentitySolutionModule } from '@lcu/lcu-sln-identity';
import { ForgeInfrastructureSolutionModule } from '@lcu/lcu-sln-infrastructure';
import { ForgeReportingSolutionModule } from '@lcu/lcu-sln-reporting';

const modules = [
	ForgeApplicationsSolutionModule,
	ForgeAssetsSolutionModule,
	ForgeDevicesSolutionModule,
	ForgeDashboardsSolutionModule,
	ForgeIdentitySolutionModule,
	ForgeInfrastructureSolutionModule,
	ForgeReportingSolutionModule,
	ForgeWeatherCloudSolutionModule,
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
