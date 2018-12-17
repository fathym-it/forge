import { Component, Input, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-assets-heading',
	templateUrl: './assets-heading.component.html',
	styleUrls: ['./assets-heading.component.scss']
})
export class ForgeAssetsSolutionHeading extends ForgeGenericSolution
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
