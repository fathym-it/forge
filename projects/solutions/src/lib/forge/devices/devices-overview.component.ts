import { Component, Input, ElementRef, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { isResultSuccess } from '@lcu/common';

@Component({
	selector: 'forge-solution-devices-overview',
	templateUrl: './devices-overview.component.html',
	styleUrls: ['./devices-overview.component.scss']
})
export class ForgeDevicesSolutionOverview extends ForgeGenericSolution
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
