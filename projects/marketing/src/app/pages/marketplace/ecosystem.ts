import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterHelpersService } from '@lcu/routing';

@Component({
	selector: 'ecosystem',
	templateUrl: './ecosystem.html',
  styleUrls: ['./ecosystem.scss'],
  providers: [RouterHelpersService]
})
export class EcosystemComponent implements OnInit {
	//	Properties
	public Ecosystem: string;

	//	Constructors
	constructor(protected routerHelpers: RouterHelpersService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.routerHelpers.RunOnRouteParam('ecosystem', (data) => {
			this.Ecosystem = data.ecosystem;
		});
	}
}
