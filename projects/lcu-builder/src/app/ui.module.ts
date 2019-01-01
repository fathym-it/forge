import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatIconRegistry,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { MaterialDesignFrameworkModule } from "angular6-json-schema-form";
import { IBuildersService, ISolutionsService } from "@lcu/elements";
import { PageViewModule } from "@lcu/daf-ui";
import {
  ForgeBuildersModule,
  ForgeBuildersService,
  ForgeSolutionsService
} from "@fathym-forge/common";
import { FathymSharedModule } from "@lcu/hosting";
import { IdentityOptions, IdentityService } from "@lcu/identity";
import { RouterHelpersService } from "@lcu/routing";
import {
  DatabaseService,
  DataMapperService,
  ForgeOrganizationService,
  PageUIService,
  ForgeApplicationsService,
  ForgePageService,
  ForgeJSONSchemaService,
  ReportingService,
  DBConfigContext,
  DevicesConfigContext,
  PageSettingsContext,
  ForgeSettingsContext,
  PagesSetupContext,
  PointersConfigContext,
  ReportingConfigContext,
  SolutionsSetupContext
} from "@lcu/daf-common";
import {
  DomainService,
  SingletonService,
  AssetsConfigContext
} from "@lcu/enterprises";

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
  MatToolbarModule
];

var thirdPartyServices = [];

var fathymModules = [ForgeBuildersModule, PageViewModule];

var fathymServices = [
  {
    provide: IdentityOptions,
    useValue: {
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
  RouterHelpersService,
  DatabaseService,
  DataMapperService,
  DomainService,
  IdentityService,
  SingletonService,
  ForgeOrganizationService,
  PageUIService,
  ForgeApplicationsService,
  ForgePageService,
  ForgeJSONSchemaService,
  ReportingService,
  { provide: IBuildersService, useClass: ForgeBuildersService },
  { provide: ISolutionsService, useClass: ForgeSolutionsService },
  AssetsConfigContext,
  DBConfigContext,
  DevicesConfigContext,
  // FlowsConfigContext,
  ForgeSettingsContext,
  PageSettingsContext,
  PagesSetupContext,
  PointersConfigContext,
  ReportingConfigContext,
  SolutionsSetupContext
];

var localModules: Array<any> = [];

var localServices = [];

var modules = [
  FathymSharedModule,
  ...thirdPartyModules,
  ...localModules,
  ...fathymModules
];

var services = [...thirdPartyServices, ...localServices, ...fathymServices];

var comps = [];

@NgModule({
  declarations: [...comps],
  imports: [...modules],
  exports: [...comps, ...modules],
  entryComponents: [...comps],
  providers: [
    // {
    //   provide: PageCompilerOptions,
    //   useValue: <PageCompilerOptions>{
    //     Modules: [
    //       //UIModule.forRoot()
    //     ]
    //   }
    // }
  ]
})
export class UIModule {
  //	Constructors
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias("fontawesome", "fa");
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
      providers: [...services]
    };
  }
}
