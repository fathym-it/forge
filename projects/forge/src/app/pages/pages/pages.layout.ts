import { Component, OnInit, Injector } from '@angular/core';
import { PagesRootLayoutComponent } from '../pages-root.layout';

@Component({
	selector: 'pages-layout',
	templateUrl: './pages.layout.html',
	host: {
		'[class]': `'display: block; position: relative;'`
	}
})
export class PagesLayoutComponent extends PagesRootLayoutComponent {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected injector: Injector) {
      super(injector);
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}
