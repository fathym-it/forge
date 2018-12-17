import { Component, Input, OnInit, Injector } from '@angular/core';
import { isResultSuccess } from '@lcu/common';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-identity-documentation',
	templateUrl: './identity-documentation.component.html',
	styleUrls: ['./identity-documentation.component.scss']
})
export class ForgeIdentitySolutionDocumentation extends ForgeGenericSolution
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
