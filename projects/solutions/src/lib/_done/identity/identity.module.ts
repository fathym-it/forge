import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatPaginatorModule, MatTableModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeIdentitySolutionManage } from './identity-manage.component';
import { ForgeIdentitySolutionDocumentation } from './identity-documentation.component';
import { ForgeIdentitySolutionHeading } from './identity-heading.component';
import { ForgeIdentitySolutionMarketplace } from './identity-marketplace.component';
import { ForgeIdentitySolutionOverview } from './identity-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ForgeIdentitySolutionManageClaimDialog } from './identity-manage-claim.dialog';

export class ForgeIdentitySolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeIdentitySolutionDocumentation;
	}

	public Heading() {
		return ForgeIdentitySolutionHeading;
	}

	public Manage() {
		return ForgeIdentitySolutionManage;
	}

	public Marketplace() {
		return ForgeIdentitySolutionMarketplace;
	}

	public Overview() {
		return ForgeIdentitySolutionOverview;
	}
}

var comps = [
	ForgeIdentitySolutionDocumentation,
	ForgeIdentitySolutionHeading,
	ForgeIdentitySolutionManage,
	ForgeIdentitySolutionMarketplace,
	ForgeIdentitySolutionOverview,
	ForgeIdentitySolutionManageClaimDialog,
];

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		DndModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
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
export class ForgeIdentitySolutionModule { }
