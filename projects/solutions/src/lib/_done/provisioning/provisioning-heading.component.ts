import { Component, Input, OnInit, Injector } from '@angular/core';
import { isResultSuccess } from '@lcu/common';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-provisioning-heading',
	templateUrl: './provisioning-heading.component.html',
	styleUrls: ['./provisioning-heading.component.scss']
})
export class ForgeProvisioningSolutionHeading extends ForgeGenericSolution
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
