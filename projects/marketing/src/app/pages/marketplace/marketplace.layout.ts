import { Component } from '@angular/core';
import { PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'app-marketplace',
	templateUrl: './marketplace.layout.html'
})
export class MarketplaceLayoutComponent {
	//	Properties

	//	Constructors
	constructor(protected pgUiSvc: PageUIService) {
	}


	//	API Methods
	public ToggleSideNav() {
		this.pgUiSvc.SideNav.Toggle();
	}
}
