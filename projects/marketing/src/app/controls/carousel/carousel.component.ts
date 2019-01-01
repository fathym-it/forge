import {
	AfterContentInit, Component, ContentChildren, Input, Output,
	EventEmitter, QueryList, ViewContainerRef
} from '@angular/core';

import { CarouselFrameComponent } from './carousel-frame.component';

@Component({
	selector: 'f-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	host: {
		'(mouseenter)': 'OnMouseEnter()',
		'(mouseleave)': 'OnMouseLeave()'
	}
})
export class CarouselComponent implements AfterContentInit {
	//  Fields
	protected activeIndex: number;

	protected delayInterval: any;

	//  Properties
	@Input('cycle-delay')
	public CycleDelay: number;

	@ContentChildren(CarouselFrameComponent)
	public Frames: QueryList<CarouselFrameComponent>;

	@Input('start-delay')
	public StartDelay: number;

	//  Constructors
	constructor(protected vc: ViewContainerRef) {
		this.CycleDelay = 4000;

		this.StartDelay = 0;
	}

	//	Life Cycle
	public ngAfterContentInit() {
		this.clearFrameHandling();

		this.activeIndex++;

		this.initFrameHandling(this.StartDelay);
	}

	//	API Methods
	public OnMouseEnter() {
		this.clearFrameHandling();
	}

	public OnMouseLeave() {
		this.clearFrameHandling();

		this.initFrameHandling(this.StartDelay);
	}

	//	Helpers
	protected clearFrameHandling() {
		if (this.delayInterval) {
			clearInterval(this.delayInterval);

			this.delayInterval = null;
		}
	}

	protected initFrameHandling(tempCycle?: number) {
		setTimeout(() => {
			this.handleFrames();

			if (this.CycleDelay > 0)
				this.delayInterval = setInterval(() => {
					this.activeIndex++;

					this.handleFrames();
				}, this.CycleDelay);
		}, tempCycle || 0);
	}

	protected handleFrames() {
		if (!this.activeIndex || this.activeIndex >= this.Frames.length)
			this.activeIndex = 0;

		var oldActive = this.Frames.find((frame) => {
			return frame.State == 'active';
		});

		if (oldActive)
			oldActive.State = 'inactive';

		var activeFrame = this.Frames.toArray()[this.activeIndex];

		if (activeFrame)
			activeFrame.State = 'active';
	}
}
