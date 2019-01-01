import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';
import { PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'app-root',
	templateUrl: './app.layout.html'
})
export class AppLayoutComponent implements AfterViewInit {
	//	Fields

	//	Properties
	@ViewChild('sidenav')
	public SideNav: MatSidenav;

	//	Constructors
	constructor(protected pgUiSvc: PageUIService) {

	}

	//	Life Cycle
	public ngAfterViewInit() {
		this.pgUiSvc.SideNav.Set(this.SideNav)
	}

	//	API Methods

	//	Helpers
}
