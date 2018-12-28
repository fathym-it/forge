import { NgModule } from '@angular/core';

import { CoreModule } from '../../../register/src/app/core.module';

@NgModule({
	declarations: [
	],
	imports: [
		CoreModule,
	],
	providers: [],
	bootstrap: [CoreModule.LoadBootstrap()],
})
export class AppModule { }
