import { Component, Input, ElementRef, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { isResultSuccess } from '@lcu/common';

@Component({
	selector: 'forge-solution-identity-overview',
	templateUrl: './identity-overview.component.html',
	styleUrls: ['./identity-overview.component.scss']
})
export class ForgeIdentitySolutionOverview extends ForgeGenericSolution
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
