import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { FlowService } from '@lcu/flux';

@Component({
    selector: 'app-fathym-server',
    templateUrl: './fathym-server.html',
})
export class FathymServerComponent extends BaseModuleManagerComponent implements OnInit {
    //	Fields
    public SizeInMBMax = 5120;
    public SizeInMBMin = 1024;

    public SizeInMBError;

    //	Properties
    public get Description(): string {
        return this.Settings.Description;
    }

    public set Description(value: string) {
        this.Settings.Description = value;
    }

    public get TopicName(): string {
        this.checkSettingsObject();

        return this.Settings.ServiceBusSettings.TopicName;
    }

    public set TopicName(value: string) {
        this.Settings.ServiceBusSettings.TopicName = value.toLowerCase();
        this.Settings.Lookup = value.toLowerCase();
    }

    public get Lookup() {
        return this.Settings.Lookup;
    }

    public get SizeInMB(): number {
        return this.Settings.ServiceBusSettings.SizeInMB;
    }

    public set SizeInMB(value: number) {
        this.Settings.ServiceBusSettings.SizeInMB = value;
    }

    //	Constructors
    constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef, protected flowSvc: FlowService) {
        super(container, routerHelpers, cdRef, flowSvc);

        this.checkSettingsObject();

        this.SettingsLoaded.subscribe(item => this.ModuleLoaded());

        this.SizeInMBError = "";
    }

    //	Runtime
    public ngOnInit() {
        super.ngOnInit();
    }

    //	API Methods
    public IsValid() {
        var isValid = true;

        this.SizeInMBError = "";

        if (!(this.SizeInMBMin <= this.SizeInMB && this.SizeInMB <= this.SizeInMBMax)) {
            isValid = false;
            this.SizeInMBError = "Must be an integer value between " + this.SizeInMBMin.toString() + " and " + this.SizeInMBMax.toString();
        }

        return isValid;
    }
    public Save() {
        if (this.IsValid())
            super.Save();
    }

    public ModuleLoaded() {
        if (this.Settings.ServiceBusSettings.SizeInMB == null || this.Settings.ServiceBusSettings.SizeInMB == undefined || this.Settings.ServiceBusSettings.SizeInMB == 0)
            this.Settings.ServiceBusSettings.SizeInMB = 1024;

    }

    //Helpers
    protected checkSettingsObject() {
        if (!this.Settings)
            this.Settings = {};

        if (!this.Settings.ServiceBusSettings)
            this.Settings.ServiceBusSettings = {};
    }
}
