import { Component, Input, OnInit, Injector } from '@angular/core';
import { isResultSuccess } from '@lcu/common';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-provisioning-documentation',
	templateUrl: './provisioning-documentation.component.html',
	styleUrls: ['./provisioning-documentation.component.scss']
})
export class ForgeProvisioningSolutionDocumentation extends ForgeGenericSolution
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
