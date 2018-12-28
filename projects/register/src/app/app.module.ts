import { NgModule } from '@angular/core';

import { CoreModule } from '../../../sign-in/src/app/core.module';

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
