import { Component, ViewChild } from '@angular/core';
import { isResultSuccess, BaseResponse } from '@lcu/core';
import { IdentityService } from '@lcu/identity';
import { MatSidenav } from '@angular/material';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
	selector: 'flux-core-layout',
	templateUrl: './flux-core.layout.html'
})
export class FluxCoreLayoutComponent {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected idSvc: IdentityService, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {

	}

	//	Life Cycle

	//	API Methods
	public SignOut() {
		this.idSvc.SignOut()
			.subscribe((result: BaseResponse) => {
				if (isResultSuccess(result)) {
					window.location.href = '/';
				} else {
					window.location.href = window.location.href;
				}
			},
				(error: any) => {
					window.location.href = window.location.href;
				});
	}

	//	Helpers
}
