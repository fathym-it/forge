import { Component, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';

@Component({
	selector: 'forge-solution-assets-documentation',
	templateUrl: './assets-documentation.component.html',
	styleUrls: ['./assets-documentation.component.scss']
})
export class ForgeAssetsSolutionDocumentation extends ForgeGenericSolution
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
