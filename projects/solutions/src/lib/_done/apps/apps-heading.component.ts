import { Component, Input, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-applications-heading',
	templateUrl: './apps-heading.component.html',
	styleUrls: ['./apps-heading.component.scss']
})
export class ForgeApplicationsSolutionHeading extends ForgeGenericSolution
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
