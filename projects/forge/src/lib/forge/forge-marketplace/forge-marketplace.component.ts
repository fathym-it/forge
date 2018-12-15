import { Component, Injector } from '@angular/core';
import { IControlMarketplace, ForgeGenericControl } from '@lowcodeunit/elements';
import { ForgeForgeDetails, ForgeForgeConfig } from '../forge.core';

@Component({
	selector: 'forge-forge-marketplace',
	templateUrl: './forge-marketplace.component.html',
	styleUrls: ['./forge-marketplace.component.scss']
})
export class ForgeForgeMarketplaceComponent
	extends ForgeGenericControl<ForgeForgeDetails, ForgeForgeConfig>
	implements IControlMarketplace<ForgeForgeDetails, ForgeForgeConfig> {
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
