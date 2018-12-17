import { Component, Input, Injector, OnInit } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-provisioning-marketplace',
	templateUrl: './provisioning-marketplace.component.html',
	styleUrls: ['./provisioning-marketplace.component.scss']
})
export class ForgeProvisioningSolutionMarketplace extends ForgeGenericSolution
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
