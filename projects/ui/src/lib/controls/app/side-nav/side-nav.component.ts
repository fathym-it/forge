import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Component({
	selector: 'forge-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class ForgeSideNavComponent implements OnChanges, OnInit {
	//  Fields

	//  Properties
	public IsAuthenticated: boolean;

	public Loading: boolean;

	public ShowProfileDetails: boolean;

	public Setup: SolutionsSetup;

	//  Constructors
	constructor(protected solutionsSetup: SolutionsSetupContext, protected idSvc: IdentityService, protected router: Router) {
	}

	//	Life Cycle
	public ngOnChanges() {
		this.isAuthenticated();
	}

	public ngOnInit() {
		this.isAuthenticated();

		this.solutionsSetup.Context.subscribe(setup => {
			this.Setup = setup;
		});

		this.solutionsSetup.Loading.subscribe(loading => {
			this.Loading = loading;
		});
	}

	//	API Methods
	public IsRouteActive(url: string | UrlTree, exact: boolean = true): boolean {
		return this.router.isActive(url, exact);
	}

	//	Helpers
	protected isAuthenticated() {
		this.idSvc.IsAuthenticated().subscribe(
			(result) => {
				this.IsAuthenticated = isResultSuccess(result);
			});
	}
}
