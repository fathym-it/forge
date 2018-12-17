import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeApplicationsSolutionManage } from './apps-manage.component';
import { ForgeApplicationsSolutionDocumentation } from './apps-documentation.component';
import { ForgeApplicationsSolutionHeading } from './apps-heading.component';
import { ForgeApplicationsSolutionMarketplace } from './apps-marketplace.component';
import { ForgeApplicationsSolutionOverview } from './apps-overview.component';
import { AppsManageAppDialog } from './apps-manage-app.dialog';
import { AppsManageSecurityDialog } from './apps-manage-security.dialog';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { AppsCreateDialog } from './apps-create.dialog';

export class ForgeApplicationsSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeApplicationsSolutionDocumentation;
	}

	public Heading() {
		return ForgeApplicationsSolutionHeading;
	}

	public Manage() {
		return ForgeApplicationsSolutionManage;
	}

	public Marketplace() {
		return ForgeApplicationsSolutionMarketplace;
	}

	public Overview() {
		return ForgeApplicationsSolutionOverview;
	}
}

var comps = [
	ForgeApplicationsSolutionDocumentation,
	ForgeApplicationsSolutionHeading,
	ForgeApplicationsSolutionManage,
	ForgeApplicationsSolutionMarketplace,
	ForgeApplicationsSolutionOverview,
	AppsCreateDialog,
	AppsManageAppDialog,
	AppsManageSecurityDialog,
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
		MatProgressSpinnerModule,
		MatSelectModule,
		MatSlideToggleModule,
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
export class ForgeApplicationsSolutionModule { }
