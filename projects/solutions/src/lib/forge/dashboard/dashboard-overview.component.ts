import { Component, Input, ElementRef, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { isResultSuccess } from '@lcu/common';

@Component({
	selector: 'forge-solution-dashboard-overview',
	templateUrl: './dashboard-overview.component.html',
	styleUrls: ['./dashboard-overview.component.scss']
})
export class ForgeDashboardSolutionOverview extends ForgeGenericSolution
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
