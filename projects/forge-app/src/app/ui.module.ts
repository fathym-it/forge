import { IBuildersService, ISolutionsService } from '@lcu/elements';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconRegistry, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ForgeBuildersModule, ForgeSolutionsModule, ForgeBuildersService, ForgeSolutionsService } from '@fathym-forge/common';
import { ForgeSideNavModule } from '@fathym-forge/ui';
import { FathymSharedModule } from '@lcu/hosting';

var thirdPartyModules = [
	AngularFontAwesomeModule,
	FlexLayoutModule,
	MonacoEditorModule,
	FormsModule,
	ReactiveFormsModule,
	MaterialDesignFrameworkModule,
	MatButtonModule,
	MatDialogModule,
	MatIconModule,
	MatSidenavModule,
    MatToolbarModule,
    MatCardModule
];

var thirdPartyServices = [
];

var fathymModules = [
	ForgeSideNavModule,
	ForgeBuildersModule,
	ForgeSolutionsModule,
	// ForgeWeatherCloudSolutionModule,
	// ForgeFlowSolutionModule,
	// PageViewModule,
];

var fathymServices = [
	// {
	// 	provide: IdentityOptions,
	// 	useValue: {
    //         ConfirmPasswordRecoveryURL: `/daf-identity/recover/confirm`,
    //         IsAuthenticatedURL: `/daf-identity/authenticated`,
    //         IsRegisteredPasswordQueryParamName: `password`,
    //         IsRegisteredUserQueryParamName: `email`,
    //         IsRegisteredURL: `/daf-identity/registered`,
	// 		RecoverPasswordURL: `/daf-identity/recover/init`,
	// 		RegisterURL: `/daf-identity/register`,
	// 		SignInURL: `/daf-identity/signin`,
	// 		SignOutURL: `/daf-identity/signout`
	// 	}
	// },
	// RouterHelpersService,
	// DatabaseService,
	// DataMapperService,
	// DomainService,
	// IdentityService,
	// SingletonService,
	// PageUIService,
	// ForgeApplicationsService,
	// ForgeOrganizationService,
	// ForgeOrganizationIdentityService,
	// ForgePageService,
	// ForgeJSONSchemaService,
    // ReportingConfigContext,
    // ReportingService,
	// AssetsConfigContext,
	// DBConfigContext,
	// DevicesConfigContext,
	// FlowsConfigContext,
	// ForgeSettingsContext,
	// PageSettingsContext,
	// PagesSetupContext,
	// PointersConfigContext,
	// ProvisioningService,
	// SolutionsSetupContext,
	// WeatherCloudService
	{ provide: IBuildersService, useClass: ForgeBuildersService },
	{ provide: ISolutionsService, useClass: ForgeSolutionsService },
];

var localModules: Array<any> = [
];

var localServices = [
];

var modules = [
	FathymSharedModule,
	...thirdPartyModules,
	...localModules,
	...fathymModules
];

var services = [
	...thirdPartyServices,
	...localServices,
	...fathymServices
];

var comps = [
];

@NgModule({
	declarations: [
		...comps,
	],
	imports: [
		...modules,
	],
	exports: [
		...comps,
		...modules,
	],
	entryComponents: [
		...comps,
	],
	providers: [
		// {
		// 	provide: PageCompilerOptions,
		// 	useValue: <PageCompilerOptions>{
		// 		Modules: [
		// 			//UIModule.forRoot()
		// 		]
		// 	}
		// },
	]
})
export class UIModule {
	//	Constructors
	constructor(public matIconRegistry: MatIconRegistry) {
		matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
	}

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: UIModule,
			providers: [...services]
		};
	}
}
