import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeSolutionsService } from './svc/solutions.service';

@NgModule({
	imports: [
		FathymSharedModule,
	],
	declarations: [
	],
	exports: [
	]
})
export class ForgeSolutionsModule { 
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ForgeSolutionsModule,
			providers: [
				ForgeSolutionsService
			]
		}
	}
}
