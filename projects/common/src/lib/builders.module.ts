import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeBuildersService } from './svc/builders.service';
import { ForgeDepartureTableModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeAssetsConfigManagerModule } from '@lcu/lcu-el-assets-config-manager';
import { ForgeAssetsDomainInputModule } from '@lcu/lcu-el-assets-domain-input';
import { ForgeAssetsDomainViewModule } from '@lcu/lcu-el-assets-domain-view';
import { ForgeIdentityRegisterModule } from '@lcu/lcu-el-identity-register';
import { ForgeIdentitySignInModule } from '@lcu/lcu-el-identity-sign-in';
import { ForgeIdentityRecoverPasswordModule } from '@lcu/lcu-el-identity-recover-password';
import { ForgeReportingEditModule } from '@lcu/lcu-el-reporting-edit';
import { ForgeReportingViewModule } from '@lcu/lcu-el-reporting-view';
import { ForgeDisplayActionModule } from '@lcu/lcu-el-display-action';
import { ForgeDisplayChartsModule } from '@lcu/lcu-el-display-charts';
import { ForgeDisplayContentModule } from '@lcu/lcu-el-display-content';
import { ForgeDisplayJsonViewModule } from '@lcu/lcu-el-display-json-view';
import { ForgeDisplayPointerModule } from '@lcu/lcu-el-display-pointer';
import { ForgeLayoutFlexModule } from '@lcu/lcu-el-layout-flex';
import { ForgeMaterialNavToolbarModule } from '@lcu/lcu-el-material-nav-toolbar';
import { ForgeMaterialNavMenuModule } from '@lcu/lcu-el-material-nav-menu';
import { ForgeMaterialLayoutGridListModule } from '@lcu/lcu-el-material-layout-grid-list';
import { ForgeMaterialLayoutCardModule } from '@lcu/lcu-el-material-layout-card';
import { ForgeLayoutSwitchStateModule } from '@lcu/lcu-el-layout-switch-state';
import { ForgeLayoutStackedModule } from '@lcu/lcu-el-layout-stacked';

const modules = [
	ForgeDepartureTableModule,
	ForgeAssetsConfigManagerModule,
	ForgeAssetsDomainInputModule,
	ForgeAssetsDomainViewModule,
	ForgeDisplayActionModule,
	ForgeDisplayChartsModule,
	ForgeDisplayContentModule,
	ForgeDisplayJsonViewModule,
	ForgeDisplayPointerModule,
	ForgeIdentityRegisterModule,
	ForgeIdentitySignInModule,
	ForgeIdentityRecoverPasswordModule,
	ForgeLayoutFlexModule,
	ForgeLayoutStackedModule,
	ForgeLayoutSwitchStateModule,
	ForgeMaterialLayoutCardModule,
	ForgeMaterialLayoutGridListModule,
	ForgeMaterialNavMenuModule,
	ForgeMaterialNavToolbarModule,
	ForgeReportingEditModule,
	ForgeReportingViewModule,
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
export class ForgeBuildersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ForgeBuildersModule,
			providers: [
				ForgeBuildersService
			]
		}
	}
}
