import { Component, Input, OnInit, Injector } from '@angular/core';
import { isResultSuccess } from '@lcu/common';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-identity-heading',
	templateUrl: './identity-heading.component.html',
	styleUrls: ['./identity-heading.component.scss']
})
export class ForgeIdentitySolutionHeading extends ForgeGenericSolution
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
