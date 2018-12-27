import { Component } from '@angular/core';
import { RouterHelpersService } from '@lcu/routing';

@Component({
	selector: 'pages-view-page',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss'],
	providers: [
		RouterHelpersService
	]
})
export class ViewPage {
	//	Properties
	public Lookup: string;

	//	Constructors
	constructor(protected routerHelpers: RouterHelpersService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.routerHelpers.RunOnRouteParam('lookup', (params) => {
			this.Lookup = params.lookup;
		});
	}

	//	API Methods

	//	Helpers
}
