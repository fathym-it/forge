import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeBuildersService } from './svc/builders.service';
import { ForgeDepartureTableModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeWcSearchFormModule } from '@weather-cloud/lcu-el-wc-search-form';
import { ForgeAssetsConfigManagerModule } from '@lowcodeunit/lcu-el-assets-config-manager';
import { ForgeAssetsDomainInputModule } from '@lowcodeunit/lcu-el-assets-domain-input';
import { ForgeAssetsDomainViewModule } from '@lowcodeunit/lcu-el-assets-domain-view';
import { ForgeIdentityRegisterModule } from '@lowcodeunit/lcu-el-identity-register';
import { ForgeIdentitySignInModule } from '@lowcodeunit/lcu-el-identity-sign-in';
import { ForgeIdentityRecoverPasswordModule } from '@lowcodeunit/lcu-el-identity-recover-password';
import { ForgeReportingEditModule } from '@lowcodeunit/lcu-el-reporting-edit';
import { ForgeReportingViewModule } from '@lowcodeunit/lcu-el-reporting-view';
import { ForgeDisplayActionModule } from '@lowcodeunit/lcu-el-display-action';
import { ForgeDisplayChartsModule } from '@lowcodeunit/lcu-el-display-charts';
import { ForgeDisplayContentModule } from '@lowcodeunit/lcu-el-display-content';
import { ForgeDisplayJsonViewModule } from '@lowcodeunit/lcu-el-display-json-view';
import { ForgeDisplayPointerModule } from '@lowcodeunit/lcu-el-display-pointer';
import { ForgeLayoutFlexModule } from '@lowcodeunit/lcu-el-layout-flex';
import { ForgeMaterialNavToolbarModule } from '@lowcodeunit/lcu-el-material-nav-toolbar';
import { ForgeMaterialNavMenuModule } from '@lowcodeunit/lcu-el-material-nav-menu';
import { ForgeMaterialLayoutGridListModule } from '@lowcodeunit/lcu-el-material-layout-grid-list';
import { ForgeMaterialLayoutCardModule } from '@lowcodeunit/lcu-el-material-layout-card';
import { ForgeLayoutSwitchStateModule } from '@lowcodeunit/lcu-el-layout-switch-state';
import { ForgeLayoutStackedModule } from '@lowcodeunit/lcu-el-layout-stacked';

const modules = [
  ForgeDepartureTableModule,
  ForgeWcSearchFormModule,
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
