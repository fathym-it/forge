import { Component, Injector } from '@angular/core';
import { IControlRender, ForgeGenericControl } from '@lowcodeunit/elements';
import { ForgeForgeDetails, ForgeForgeConfig } from '../forge.core';

@Component({
	selector: 'forge-forge-render',
	templateUrl: './forge-render.component.html',
	styleUrls: ['./forge-render.component.scss']
})
export class ForgeForgeRenderComponent
	extends ForgeGenericControl<ForgeForgeDetails, ForgeForgeConfig>
	implements IControlRender<ForgeForgeDetails, ForgeForgeConfig> {
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
