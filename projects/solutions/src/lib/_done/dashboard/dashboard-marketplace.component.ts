import { Component, Input, Injector, OnInit } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-dashboard-marketplace',
	templateUrl: './dashboard-marketplace.component.html',
	styleUrls: ['./dashboard-marketplace.component.scss']
})
export class ForgeDashboardSolutionMarketplace extends ForgeGenericSolution
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
