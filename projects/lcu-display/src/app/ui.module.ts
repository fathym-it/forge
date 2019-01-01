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
import {
  ForgeBuildersModule,
  ForgeSolutionsService,
  ForgeBuildersService
} from "@fathym-forge/common";
import {
  PageUIService,
  DatabaseService,
  DataMapperService,
  ForgeApplicationsService,
  ForgeOrganizationService,
  ForgePageService,
  ForgeJSONSchemaService,
  DBConfigContext,
  DevicesConfigContext,
  ForgeSettingsContext,
  PageSettingsContext,
  PagesSetupContext,
  PointersConfigContext,
  ReportingConfigContext,
  ReportingService,
  SolutionsSetupContext
} from "@lcu/daf-common";
import { PageViewModule } from "@lcu/daf-ui";
import { IdentityOptions, IdentityService } from "@lcu/identity";
import { RouterHelpersService } from "@lcu/routing";
import {
  DomainService,
  SingletonService,
  AssetsConfigContext
} from "@lcu/enterprises";
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
  PageUIService,
  ForgeApplicationsService,
  ForgeOrganizationService,
  ForgePageService,
  ForgeJSONSchemaService,
  { provide: ISolutionsService, useClass: ForgeSolutionsService },
  { provide: IBuildersService, useClass: ForgeBuildersService },
  AssetsConfigContext,
  DBConfigContext,
  DevicesConfigContext,
  // FlowsConfigContext,
  ForgeSettingsContext,
  PageSettingsContext,
  PagesSetupContext,
  PointersConfigContext,
  ReportingConfigContext,
  ReportingService,
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
