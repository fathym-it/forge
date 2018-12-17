import { Component, Input, OnInit, Injector } from '@angular/core';
import { isResultSuccess } from '@lcu/common';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-devices-heading',
	templateUrl: './devices-heading.component.html',
	styleUrls: ['./devices-heading.component.scss']
})
export class ForgeDevicesSolutionHeading extends ForgeGenericSolution
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
