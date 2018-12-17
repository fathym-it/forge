import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatButtonToggleModule, MatProgressSpinnerModule } from '@angular/material';
import { FathymSharedModule } from '@lcu/hosting';

import { ForgeSideNavComponent } from './side-nav.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
	imports: [
		FathymSharedModule,
		AngularFontAwesomeModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatProgressSpinnerModule,
	],
	declarations: [
		ForgeSideNavComponent,
	],
	exports: [
		ForgeSideNavComponent,
	]
})
export class ForgeSideNavModule { }
