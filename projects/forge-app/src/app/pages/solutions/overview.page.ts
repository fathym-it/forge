import { Component, Inject } from '@angular/core';
import { isResultSuccess } from '@lcu/core';
import { Router } from '@angular/router';
import { SolutionModuleSetup, SolutionsSetup, ISolutionsService, SolutionModuleConfig, SolutionElement } from '@lcu/elements';
import { SolutionsSetupContext } from '@lcu/daf-common';

@Component({
	selector: 'solutions-overview-pages',
	templateUrl: './overview.page.html',
	styleUrls: ['./overview.page.scss']
})
export class OverviewPage {
	//	Properties
	public get HasSolutions(): boolean {
		return this.Setup && this.Setup.Configs && this.Setup.Configs.length > 0;
	}

	public Loading: boolean;

	public SolutionOptions: SolutionModuleSetup[];

	public Setup: SolutionsSetup;

	//	Constructors
	constructor(protected solutionsSetup: SolutionsSetupContext, protected router: Router,
		protected solutionsSvc: ISolutionsService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.solutionsSetup.Context.subscribe(setup => {
			this.Setup = setup;
		});

		this.solutionsSetup.Loading.subscribe(loading => {
			this.Loading = loading;
		});

		this.solutionsSvc.LoadSolutionModules().subscribe(
			(result) => {
				if (isResultSuccess(result)) {
					this.SolutionOptions = result.Model;
				} else {

				}
			});
	}

	//	API Methods
	public IsExisting(module: SolutionModuleConfig) {
		var existing = module && this.Setup && this.Setup.Configs.find(c => c.Control.Base == module.Control.Base && c.Control.Type == module.Control.Type);

		return !!existing;
	}

	public HasAnyAvailable(setup: SolutionModuleSetup) {
		return setup && setup.Modules.some(m => !this.IsExisting(m));
	}

	public Save(module: SolutionModuleConfig) {
		var existing = this.IsExisting(module);

		if (!existing && confirm(`Are you sure you want to select ${module.Name}?`)) {
			this.Setup.Configs.push(<SolutionElement>{
				Title: module.Name,
				Control: module.Control
			});

			this.solutionsSetup.Save(this.Setup).subscribe(() => {
				this.router.navigate(['/solutions', module.Control.Base, module.Control.Type, 'overview'])
			});
		} else if (existing) {
			alert('Cannot add the solution as it is already added to your enterprise.');
		}
	}
}
