import { IBuildersService, ISolutionsService } from '@lcu/elements';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatIconRegistry, MatSidenavModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatButtonToggleModule, MatProgressSpinnerModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FathymSharedModule } from '@lcu/hosting';
import { DAFUIModule } from '@lcu/daf-ui';
import { ForgeSideNavModule } from './controls/side-nav/side-nav.module';
import { RouterHelpersService } from '@lcu/routing';
import { IdentityOptions } from '@lcu/identity';
import { DAFServiceSettings } from '@lcu/api';
import { SolutionsSetupContext } from '@lcu/daf-common';
import { WeatherCloudService } from '@weather-cloud/common';
import { HttpClientModule } from '@angular/common/http';
import { ForgeBuildersModule } from './common/builders.module';
import { ForgeSolutionsModule } from './common/solutions.module';
import { ForgeBuildersService } from './common/svc/builders.service';
import { ForgeSolutionsService } from './common/svc/solutions.service';

var thirdPartyModules = [
	AngularFontAwesomeModule,
	HttpClientModule,
	FlexLayoutModule,
	MonacoEditorModule,
	FormsModule,
	ReactiveFormsModule,
	MaterialDesignFrameworkModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatFormFieldModule,
	MatTabsModule,
	MatDialogModule,
	MatIconModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatSnackBarModule,
    MatToolbarModule,
    MatCardModule
];

var thirdPartyServices = [
];

var fathymModules = [
	ForgeSideNavModule,
	ForgeBuildersModule,
	ForgeSolutionsModule,
	DAFUIModule,
];

var fathymServices = [
	{
		provide: IdentityOptions,
		useValue: <IdentityOptions>{
            ConfirmPasswordRecoveryURL: `/daf-identity/recover/confirm`,
            IsAuthenticatedURL: `/daf-identity/authenticated`,
            IsRegisteredPasswordQueryParamName: `password`,
            IsRegisteredUserQueryParamName: `email`,
            IsRegisteredURL: `/daf-identity/registered`,
			RecoverPasswordURL: `/daf-identity/recover/init`,
			RegisterURL: `/daf-identity/register`,
			SignInURL: `/daf-identity/signin`,
			SignOutURL: `/daf-identity/signout`
		}
	},
	{
		provide: DAFServiceSettings,
		useValue: <DAFServiceSettings>{
            APIRoot: ``//http://intel.fathym.com`
		}
	},
	RouterHelpersService,
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
	SolutionsSetupContext,
	WeatherCloudService,
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
