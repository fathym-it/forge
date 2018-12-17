import { ForgeBuildersCoreModule } from '@lcu/elements';
import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseSolutionModule } from '../../solutions.core';
import { ForgeAssetsSolutionManage } from './assets-manage.component';
import { ForgeAssetsSolutionDocumentation } from './assets-documentation.component';
import { ForgeAssetsSolutionHeading } from './assets-heading.component';
import { ForgeAssetsSolutionMarketplace } from './assets-marketplace.component';
import { ForgeAssetsSolutionOverview } from './assets-overview.component';
import { DndModule } from '@beyerleinf/ngx-dnd';
import { ForgeAssetsSolutionCreateDialog } from './assets-create.dialog';
import { ForgeAssetsSolutionSettingsDialog } from './assets-settings.dialog';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { ForgeAssetsSolutionManageDataDialog } from './asset-manage.dialog';
import { GenericDomainModule } from 'projects/ui/src/lcu.api';

export class ForgeAssetsSolutionDisplayModule extends BaseSolutionModule {
	public Documentation() {
		return ForgeAssetsSolutionDocumentation;
	}

	public Heading() {
		return ForgeAssetsSolutionHeading;
	}

	public Manage() {
		return ForgeAssetsSolutionManage;
	}

	public Marketplace() {
		return ForgeAssetsSolutionMarketplace;
	}

	public Overview() {
		return ForgeAssetsSolutionOverview;
	}
}

var comps = [
	ForgeAssetsSolutionDocumentation,
	ForgeAssetsSolutionHeading,
	ForgeAssetsSolutionManage,
	ForgeAssetsSolutionMarketplace,
	ForgeAssetsSolutionOverview,
	ForgeAssetsSolutionCreateDialog,
	ForgeAssetsSolutionManageDataDialog,
	ForgeAssetsSolutionSettingsDialog,
];

@NgModule({
	imports: [
		FathymSharedModule,
		GenericDomainModule,
		FlexLayoutModule,
		DndModule,
		ForgeBuildersCoreModule,
		MaterialDesignFrameworkModule,
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
export class ForgeAssetsSolutionModule { }
