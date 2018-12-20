import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagesSetup, SolutionsSetup, SolutionElement } from '@lcu/elements';
import { PagesSetupContext, SolutionsSetupContext } from '@lcu/daf-common';
import { CoreForgeSolutionModules } from '@fathym-forge/common';

@Component({
	selector: 'pages-overview-pages',
	templateUrl: './overview.page.html',
	styleUrls: ['./overview.page.scss']
})
export class OverviewPage {
	//	Properties
	public get HasPages(): boolean {
		return this.PagesSetup && this.PagesSetup.Configs && this.PagesSetup.Configs.length > 0;
	}

	public get HasSolutions(): boolean {
		return this.SolutionsSetup && this.SolutionsSetup.Configs && this.SolutionsSetup.Configs.length > 0;
	}

	public PagesSetup: PagesSetup;

	public SolutionsSetup: SolutionsSetup;

	//	Constructors
	constructor(protected pagesSetup: PagesSetupContext, protected solutionsSetup: SolutionsSetupContext,
		protected router: Router) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.pagesSetup.Context.subscribe(setup => {
			this.PagesSetup = setup;
		});
		
		this.solutionsSetup.Context.subscribe(setup => {
			this.SolutionsSetup = setup;
		});
	}

	//	API Methods
	public EnableEnterpriseSubscriptions() {
		var sln = CoreForgeSolutionModules[0].Modules.find(m => m.Control.Base == 'forge-solution' && m.Control.Type == 'provisioning');

		this.SolutionsSetup.Configs.push(<SolutionElement>{
			Title: sln.Name,
			Control: sln.Control
		});

		this.solutionsSetup.Save(this.SolutionsSetup).subscribe(() => {
			this.router.navigate(['/solutions', sln.Control.Base, sln.Control.Type, 'overview']);
		});
	}
}
