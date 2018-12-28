import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { BaseResponse, isResultSuccess } from '@lcu/core';
import { IdentityService } from '@lcu/identity';

@Component({
	selector: 'app-root',
	templateUrl: './app.layout.html'
})
export class AppLayoutComponent implements AfterViewInit {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected idSvc: IdentityService) {

	}

	//	Life Cycle
	public ngAfterViewInit() {
	}

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
