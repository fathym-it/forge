import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockquoteComponent } from './blockquote.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		BlockquoteComponent,
	],
	exports: [
		BlockquoteComponent,
	]
})
export class BlockquoteModule { }
