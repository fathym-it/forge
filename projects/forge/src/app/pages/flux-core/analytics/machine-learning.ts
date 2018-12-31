import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { FlowService } from '@lcu/flux';

@Component({
	selector: 'app-machine-learning',
	templateUrl: './machine-learning.html',
})
export class MachineLearningComponent extends BaseModuleManagerComponent implements OnInit {
	//	Fields

	//	Properties
	public get Description(): string {
		return this.Settings.Description;
	}

	public set Description(value: string) {
		this.Settings.Description = value;
	}

	public get Parameters(): { key: string, value: any }[] {
		return this.Settings.Parameters;
	}

	public set Parameters(value: { key: string, value: any }[]) {
		this.Settings.Parameters = value;
	}

	//	Constructors
	constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef,
		protected flowSvc: FlowService) {
		super(container, routerHelpers, cdRef, flowSvc);
	}

	//	Runtime
	public ngOnInit() {
		super.ngOnInit();
	}

	//	API Methods
	public AddParameter() {
		if (!this.Parameters)
			this.Parameters = [];

		this.Parameters.push({ key: '', value: null });
	}

	public RemoveParameter(param: any) {
		this.Parameters.filter(p => p != param);
	}
}
