import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatIconRegistry,
	MatInputModule,
	MatProgressSpinnerModule,
	MatSelectModule,
	MatStepperModule,
	MatToolbarModule,
	MatDialogModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FathymSharedModule } from '@lcu/hosting';
import { IdentityService, IdentityOptions } from '@lcu/identity';

import { DndModule } from '@beyerleinf/ngx-dnd';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ForgeOrganizationService } from '@lcu/daf-common';

var materialModules = [
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatSelectModule,
	MatStepperModule,
	MatToolbarModule,
];

var materialServices = [
	MatIconRegistry
];

var fathymModules = [
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
	ForgeOrganizationService,
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
