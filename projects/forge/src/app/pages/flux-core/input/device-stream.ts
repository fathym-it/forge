import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { FlowService } from '@lcu/flux';

@Component({
	selector: 'app-device-stream',
	templateUrl: './device-stream.html',
})
export class DeviceStreamComponent extends BaseModuleManagerComponent implements OnInit {
	//	Fields

	//	Properties
    public get Description(): string {
        return this.Settings.Description;
    }


    public set Description(value: string) {
        this.Settings.Description = value;
    }

    public get HubLookup(): string {
        return this.Settings.HubLookup;
    }

    public set HubLookup(value: string) {
        this.Settings.HubLookup = value.toLowerCase();
        this.Settings.Lookup = value.toLowerCase();
    }

    public get Lookup() {
        return this.Settings.Lookup;
    }

	//public get Parameters(): { key: string, value: any }[] {
	//	return this.Settings.Parameters;
	//}

	//public set Parameters(value: { key: string, value: any }[]) {
	//	this.Settings.Parameters = value;
	//}

	//	Constructors
constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef, protected flowSvc: FlowService) {
		super(container, routerHelpers, cdRef, flowSvc);

        if (!this.Settings) {
            this.Settings = {};
        }
	}

	//	Runtime
	public ngOnInit() {
		super.ngOnInit();
	}

	//	API Methods
	//public AddParameter() {
	//	if (!this.Parameters)
	//		this.Parameters = [];

	//	this.Parameters.push({ key: '', value: null });
	//}

	//public RemoveParameter(param: any) {
	//	this.Parameters.filter(p => p != param);
	//}
}
