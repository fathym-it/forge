import { Component, Input, Injector, OnInit } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-assets-marketplace',
	templateUrl: './assets-marketplace.component.html',
	styleUrls: ['./assets-marketplace.component.scss']
})
export class ForgeAssetsSolutionMarketplace extends ForgeGenericSolution
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
