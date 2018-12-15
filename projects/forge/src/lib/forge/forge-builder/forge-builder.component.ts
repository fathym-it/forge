import { Component, Injector } from '@angular/core';
import { IControlBuilder, ForgeGenericControl } from '@lowcodeunit/elements';
import { ForgeForgeDetails, ForgeForgeConfig } from '../forge.core';

@Component({
	selector: 'forge-forge-builder',
	templateUrl: './forge-builder.component.html',
	styleUrls: ['./forge-builder.component.scss']
})
export class ForgeForgeBuilderComponent
	extends ForgeGenericControl<ForgeForgeDetails, ForgeForgeConfig>
	implements IControlBuilder<ForgeForgeDetails, ForgeForgeConfig> {
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
