import { Component, Input, Injector, OnInit } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-devices-marketplace',
	templateUrl: './devices-marketplace.component.html',
	styleUrls: ['./devices-marketplace.component.scss']
})
export class ForgeDevicesSolutionMarketplace extends ForgeGenericSolution
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
