import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lowcodeunit/common';
import { BaseDisplayModule } from '@lowcodeunit/elements';
import { ForgeForgeBuilderComponent } from './forge-builder/forge-builder.component';
import { ForgeForgeMarketplaceComponent } from './forge-marketplace/forge-marketplace.component';
import { ForgeForgeRenderComponent } from './forge-render/forge-render.component';

export class ForgeForgeDisplayModule extends BaseDisplayModule {
	public Builder() {
		return ForgeForgeBuilderComponent;
	}

	public Marketplace() {
		return ForgeForgeMarketplaceComponent;
	}

	public Render() {
		return ForgeForgeRenderComponent;
	}
}

var comps = [
	ForgeForgeBuilderComponent,
	ForgeForgeMarketplaceComponent,
	ForgeForgeRenderComponent,
];

@NgModule({
	imports: [
		FathymSharedModule,
	],
	declarations: [
		...comps,
	],
	exports: [
		...comps,
	],
	entryComponents: [
		...comps,
	]
})
export class ForgeForgeModule { }
