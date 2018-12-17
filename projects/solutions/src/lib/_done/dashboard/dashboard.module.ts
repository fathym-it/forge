import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeDashboardSolutionManage } from './dashboard-manage.component';
import { ForgeDashboardSolutionDocumentation } from './dashboard-documentation.component';
import { ForgeDashboardSolutionHeading } from './dashboard-heading.component';
import { ForgeDashboardSolutionMarketplace } from './dashboard-marketplace.component';
import { ForgeDashboardSolutionOverview } from './dashboard-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ReactiveFormsModule } from '@angular/forms';


export class ForgeDashboardSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeDashboardSolutionDocumentation;
	}

	public Heading() {
		return ForgeDashboardSolutionHeading;
	}

	public Manage() {
		return ForgeDashboardSolutionManage;
	}

	public Marketplace() {
		return ForgeDashboardSolutionMarketplace;
	}

	public Overview() { 
		return ForgeDashboardSolutionOverview;
	}
}

var comps = [
	ForgeDashboardSolutionDocumentation,
	ForgeDashboardSolutionHeading,
	ForgeDashboardSolutionManage,
	ForgeDashboardSolutionMarketplace,
	ForgeDashboardSolutionOverview,
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
export class ForgeDashboardSolutionModule { }
