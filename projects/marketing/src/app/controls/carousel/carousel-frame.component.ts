import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'f-carousel-frame',
	templateUrl: './carousel-frame.component.html',
	styleUrls: ['./carousel-frame.component.scss'],
	animations: [
		trigger('flyInOut', [
			state('active', style({ transform: 'translateX(0)', opacity: 1, position: 'relative' })),
			state('void', style({ transform: 'translateX(200%)', opacity: 0 })),
			transition('void => *', [
				style({position: 'absolute'}),
				group([
					animate('0.9s 0.1s ease', style({
						transform: 'translateX(0)'
					})),
					animate('0.9s ease', style({
						opacity: 1
					}))
				])
			]),
			transition('* => void', [
				style({ position: 'absolute' }),
				group([
					animate('0.9s ease', style({
						transform: 'translateX(-200%)'
					})),
					animate('0.9s 0.2s ease', style({
						opacity: 0
					}))
				])
			])
		])
	]
})
export class CarouselFrameComponent {
	//  Fields

	//  Properties
	public Active: boolean;

	@Input('state')
	public State: string;

	//  Constructors
	constructor() {
		this.State = 'inactive';
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
