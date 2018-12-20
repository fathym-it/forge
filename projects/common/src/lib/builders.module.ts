import { NgModule, ModuleWithProviders } from '@angular/core';
import { FathymSharedModule } from '@lcu/hosting';
import { ForgeBuildersService } from './svc/builders.service';

@NgModule({
	imports: [
		FathymSharedModule,
	],
	declarations: [
	],
	exports: [
	]
})
export class ForgeBuildersModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ForgeBuildersModule,
			providers: [
				ForgeBuildersService
			]
		}
	}
}
