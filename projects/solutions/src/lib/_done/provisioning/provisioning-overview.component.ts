import { Component, Input, ElementRef, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { isResultSuccess } from '@lcu/common';

@Component({
	selector: 'forge-solution-provisioning-overview',
	templateUrl: './provisioning-overview.component.html',
	styleUrls: ['./provisioning-overview.component.scss']
})
export class ForgeProvisioningSolutionOverview extends ForgeGenericSolution
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
