import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeReportingSolutionManage } from './reporting-manage.component';
import { ForgeReportingSolutionDocumentation } from './reporting-documentation.component';
import { ForgeReportingSolutionHeading } from './reporting-heading.component';
import { ForgeReportingSolutionMarketplace } from './reporting-marketplace.component';
import { ForgeReportingSolutionOverview } from './reporting-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ReactiveFormsModule } from '@angular/forms';


export class ForgeReportingSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeReportingSolutionDocumentation;
	}

	public Heading() {
		return ForgeReportingSolutionHeading;
	}

	public Manage() {
		return ForgeReportingSolutionManage;
	}

	public Marketplace() {
		return ForgeReportingSolutionMarketplace;
	}

	public Overview() { 
		return ForgeReportingSolutionOverview;
	}
}

var comps = [
	ForgeReportingSolutionDocumentation,
	ForgeReportingSolutionHeading,
	ForgeReportingSolutionManage,
	ForgeReportingSolutionMarketplace,
	ForgeReportingSolutionOverview,
];

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		DndModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatTableModule,
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
export class ForgeReportingSolutionModule { }
