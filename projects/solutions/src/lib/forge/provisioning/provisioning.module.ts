import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeProvisioningSolutionManage } from './provisioning-manage.component';
import { ForgeProvisioningSolutionDocumentation } from './provisioning-documentation.component';
import { ForgeProvisioningSolutionHeading } from './provisioning-heading.component';
import { ForgeProvisioningSolutionMarketplace } from './provisioning-marketplace.component';
import { ForgeProvisioningSolutionOverview } from './provisioning-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ReactiveFormsModule } from '@angular/forms';


export class ForgeProvisioningSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeProvisioningSolutionDocumentation;
	}

	public Heading() {
		return ForgeProvisioningSolutionHeading;
	}

	public Manage() {
		return ForgeProvisioningSolutionManage;
	}

	public Marketplace() {
		return ForgeProvisioningSolutionMarketplace;
	}

	public Overview() { 
		return ForgeProvisioningSolutionOverview;
	}
}

var comps = [
	ForgeProvisioningSolutionDocumentation,
	ForgeProvisioningSolutionHeading,
	ForgeProvisioningSolutionManage,
	ForgeProvisioningSolutionMarketplace,
	ForgeProvisioningSolutionOverview,
];

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
        MatToolbarModule,
        ReactiveFormsModule,
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
export class ForgeProvisioningSolutionModule { }
