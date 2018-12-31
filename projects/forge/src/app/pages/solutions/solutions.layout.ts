import { Component, OnInit, Injector } from '@angular/core';
import { PagesRootLayoutComponent } from '../pages-root.layout';

@Component({
	selector: 'solutions-layout',
	templateUrl: './solutions.layout.html',
	host: {}
})
export class SolutionsLayoutComponent extends PagesRootLayoutComponent {
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
