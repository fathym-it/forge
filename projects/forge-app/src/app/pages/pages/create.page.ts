import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagesSetup, PageConfig } from '@lcu/elements';
import { PagesSetupContext } from '@lcu/daf-common';

@Component({
	selector: 'pages-create-pages',
	templateUrl: './create.page.html',
	styleUrls: ['./create.page.scss']
})
export class CreatePage {
	//	Properties
	public Loading: boolean;

	public NewPageLookup: string;

	public NewPageName: string;

	public Setup: PagesSetup;

	//	Constructors
	constructor(protected pagesSetup: PagesSetupContext, protected router: Router) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.pagesSetup.Context.subscribe(setup => {
			this.Setup = setup;
		});

		this.pagesSetup.Loading.subscribe(loading => {
			this.Loading = loading;
		});
	}

	//	API Methods
	public Save() {
		var page = this.Setup.Configs.find(cfg => cfg.Lookup == this.NewPageLookup);

		if (page)
			alert(`A page with the lookup ${this.NewPageLookup} already exists, choose another name.`);
		else {
			this.Setup.Configs.push(<PageConfig>{
				Lookup: this.NewPageLookup,
				Name: this.NewPageName
			});

			this.pagesSetup.Save(this.Setup).subscribe(status => {
				this.router.navigate(['page', this.NewPageLookup]);
			});
		}
	}
}
