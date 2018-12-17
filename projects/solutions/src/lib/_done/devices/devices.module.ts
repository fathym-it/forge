import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/common';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeDevicesSolutionManage } from './devices-manage.component';
import { ForgeDevicesSolutionDocumentation } from './devices-documentation.component';
import { ForgeDevicesSolutionHeading } from './devices-heading.component';
import { ForgeDevicesSolutionMarketplace } from './devices-marketplace.component';
import { ForgeDevicesSolutionOverview } from './devices-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ForgeDevicesSolutionCreateDialog } from './devices-create.dialog';
import { ForgeDevicesSolutionSettingsDialog } from './devices-settings.dialog';
import { GenericDomainModule } from '@lcu/core';
import { ForgeBuildersCoreModule } from '@lcu/elements'

export class ForgeDevicesSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeDevicesSolutionDocumentation;
	}

	public Heading() {
		return ForgeDevicesSolutionHeading;
	}

	public Manage() {
		return ForgeDevicesSolutionManage;
	}

	public Marketplace() {
		return ForgeDevicesSolutionMarketplace;
	}

	public Overview() {
		return ForgeDevicesSolutionOverview;
	}
}

var comps = [
	ForgeDevicesSolutionDocumentation,
	ForgeDevicesSolutionHeading,
	ForgeDevicesSolutionManage,
	ForgeDevicesSolutionMarketplace,
	ForgeDevicesSolutionOverview,
	ForgeDevicesSolutionCreateDialog,
	ForgeDevicesSolutionSettingsDialog,
];

@NgModule({
	imports: [
		FathymSharedModule,
		FlexLayoutModule,
		ForgeBuildersCoreModule,
		GenericDomainModule,
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
export class ForgeDevicesSolutionModule { }
