import { Component, OnInit } from '@angular/core';

import { Address } from '@lcu/common';
import { PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'app-public',
	templateUrl: './public.layout.html'
})
export class PublicLayoutComponent implements OnInit {
	//	Properties
	public Address: Address;

	public MapKey: string;

	//	Constructors
	constructor(protected pgUiSvc: PageUIService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.MapKey = 'AIzaSyCWoNuvcEMt_bYUSLuJ7zUeSpXhtUx5H2o';  //  TODO: Get from APP Profile

		this.Address = <Address>{
			City: 'Boulder',
			Country: 'USA',
			State: 'CO',
			Street1: '5485 Conestoga Court',
			Unit: 'Suite 210',
			Zip: '80301'
		};
	}

	//	API Methods
	public ToggleSideNav() {
		this.pgUiSvc.SideNav.Toggle();
	}
}
