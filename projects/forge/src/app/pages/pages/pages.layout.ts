import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pages-layout',
	templateUrl: './pages.layout.html',
	host: {
		'[class]': `'display: block; position: relative;'`
	}
})
export class PagesLayoutComponent implements OnInit {
	//	Properties

	//	Constructors
	constructor() {
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
}
