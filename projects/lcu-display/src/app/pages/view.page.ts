import { Component, OnInit } from '@angular/core';
import { RouterHelpersService } from '@lcu/routing';

@Component({
	selector: 'pages-view-page',
	templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  providers: [RouterHelpersService],
})
export class ViewPage implements OnInit {
	//	Properties
	public get BaseHref(): string {
		return document.getElementsByTagName('base')[0].href;
	}

	public get CurrentPath(): string {
        var path = window.location.href.replace(this.BaseHref, '');

        path = path.replace(location.search, '');

		return `/${path}`;
	}

	public Lookup: string;

	//	Constructors
	constructor(protected routerHelpers: RouterHelpersService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.routerHelpers.RunOnNavigationEnd(() => {
			this.Lookup = this.CurrentPath;
		});

		this.Lookup = this.CurrentPath;
	}

	//	API Methods

	//	Helpers
}
