import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material';
import { CoreModule } from './core.module';

@NgModule({
	declarations: [
	],
	imports: [
    CoreModule,
    MatSnackBarModule,
	],
	providers: [],
	bootstrap: [CoreModule.LoadBootstrap()],
})
export class AppModule {
}
