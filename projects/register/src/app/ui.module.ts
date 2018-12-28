import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatIconRegistry,
	MatInputModule,
	MatProgressSpinnerModule,
	MatToolbarModule,
	MatDialogModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FathymSharedModule } from '@lcu/hosting';
import { IdentityService, IdentityOptions } from '@lcu/identity';

import { DndModule } from '@beyerleinf/ngx-dnd';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { ForgeRegisterModule } from '@lcu/daf-ui';

var materialModules = [
	MaterialDesignFrameworkModule,
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatToolbarModule,
];

var materialServices = [
	MatIconRegistry
];

var fathymModules = [
	ForgeRegisterModule
];

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
	IdentityService,
];

var localModules: Array<any> = [
	FlexLayoutModule,
	ReactiveFormsModule,
	DndModule,
	AngularFontAwesomeModule,
];

var localServices = [
];

var modules = [
	FathymSharedModule,
	...materialModules,
	...localModules,
	...fathymModules
];

var services = [
	...materialServices,
	...localServices,
	...fathymServices
];

@NgModule({
	declarations: [
	],
	imports: [
		...modules,
	],
	exports: [
		...modules
	],
	providers: [
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
