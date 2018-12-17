import { Component, Input, Injector, OnInit } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-identity-marketplace',
	templateUrl: './identity-marketplace.component.html',
	styleUrls: ['./identity-marketplace.component.scss']
})
export class ForgeIdentitySolutionMarketplace extends ForgeGenericSolution
	implements ISolutionControl, OnInit {
	//  Fields

	//  Properties

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
