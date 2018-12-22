import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeSolutionsService } from './svc/solutions.service';
import { ForgeWeatherCloudSolutionSolutionModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeApplicationsSolutionModule } from '@lowcodeunit/lcu-sln-applications';
import { ForgeAssetsSolutionModule } from '@lowcodeunit/lcu-sln-assets';
import { ForgeDevicesSolutionModule } from '@lowcodeunit/lcu-sln-devices';
import { ForgeDashboardsSolutionModule } from '@lowcodeunit/lcu-sln-dashboards';
import { ForgeIdentitySolutionModule } from '@lowcodeunit/lcu-sln-identity';
import { ForgeInfrastructureSolutionModule } from '@lowcodeunit/lcu-sln-infrastructure';
import { ForgeReportingSolutionModule } from '@lowcodeunit/lcu-sln-reporting';

const modules = [
	ForgeApplicationsSolutionModule,
	ForgeAssetsSolutionModule,
	ForgeDevicesSolutionModule,
	ForgeDashboardsSolutionModule,
	ForgeIdentitySolutionModule,
	ForgeInfrastructureSolutionModule,
	ForgeReportingSolutionModule,
	ForgeWeatherCloudSolutionSolutionModule,
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
