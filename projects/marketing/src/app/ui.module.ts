import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";

import { MaterialDesignFrameworkModule } from "angular6-json-schema-form";

import { FlexLayoutModule } from "@angular/flex-layout";

import { BlockquoteModule } from "./controls/blockquote/blockquote.module";
import { CarouselModule } from "./controls/carousel/carousel.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { FathymSharedModule } from "@lcu/hosting";
import { IdentityService, IdentityOptions } from "@lcu/identity";
import { ForgeRegisterModule, ForgeSignInModule } from "@lcu/identity";
import { PageUIService } from "@lcu/daf-common";

var materialModules = [
  MaterialDesignFrameworkModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule
];

var materialServices = [MatIconRegistry];

var fathymModules = [
  BlockquoteModule,
  CarouselModule,
  // MapModule,
  // PhoneModule,
  ForgeRegisterModule,
  ForgeSignInModule
];

var fathymServices = [
  PageUIService,
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
  IdentityService
];

var localModules: Array<any> = [
  FlexLayoutModule,
  ReactiveFormsModule,
  AngularFontAwesomeModule
];

var localServices = [];

var modules = [
  FathymSharedModule,
  ...materialModules,
  ...localModules,
  ...fathymModules
];

var services = [...materialServices, ...localServices, ...fathymServices];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: []
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
