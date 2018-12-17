import { Component, Input, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-applications-documentation',
	templateUrl: './apps-documentation.component.html',
	styleUrls: ['./apps-documentation.component.scss']
})
export class ForgeApplicationsSolutionDocumentation extends ForgeGenericSolution
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
