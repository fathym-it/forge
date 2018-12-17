import { Component, Input, ElementRef, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { isResultSuccess } from '@lcu/common';

@Component({
	selector: 'forge-solution-reporting-overview',
	templateUrl: './reporting-overview.component.html',
	styleUrls: ['./reporting-overview.component.scss']
})
export class ForgeReportingSolutionOverview extends ForgeGenericSolution
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
