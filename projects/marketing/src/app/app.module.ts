import { NgModule } from '@angular/core';

import { CoreModule } from './core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
	],
	imports: [
		CoreModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [CoreModule.LoadBootstrap()]
})
export class AppModule { }
