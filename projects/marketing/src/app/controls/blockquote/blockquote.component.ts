import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'blockquote',
	templateUrl: './blockquote.component.html',
	styleUrls: ['./blockquote.component.scss']
})
export class BlockquoteComponent implements OnInit {
	//  Fields

	//  Properties
	@Input('cite')
	public Cite: string;

	@Input('type')
	public Type: 'simple' | 'basic';// | 'classy-left' | 'classy-right';

	//  Constructors
	constructor() {
		this.Type = 'simple';
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods

	//	Helpers
}
