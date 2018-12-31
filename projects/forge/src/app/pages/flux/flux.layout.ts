import { Component, ViewChild, Injector } from '@angular/core';
import { isResultSuccess, BaseResponse } from '@lcu/core';
import { IdentityService } from '@lcu/identity';
import { MatSidenav } from '@angular/material';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PagesRootLayoutComponent } from '../pages-root.layout';

@Component({
	selector: 'flux-layout',
	templateUrl: './flux.layout.html'
})
export class FluxLayoutComponent extends PagesRootLayoutComponent {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected injector: Injector) {
      super(injector);
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
