import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselFrameComponent } from './carousel-frame.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		CarouselComponent,
		CarouselFrameComponent,
	],
	exports: [
		CarouselComponent,
		CarouselFrameComponent,
	]
})
export class CarouselModule { }
