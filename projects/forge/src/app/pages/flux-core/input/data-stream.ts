import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { FlowService } from '@lcu/flux';

@Component({
	selector: 'app-data-stream',
	templateUrl: './data-stream.html',
})
export class DataStreamComponent extends BaseModuleManagerComponent implements OnInit {
	//	Fields

	//	Properties
    public MessageRetentionDaysMax = 7;
    public MessageRetentionDaysMin = 1;
    public PartitionCountMax = 64;
    public PartitionCountMin = 1;
    public CaptureByteLimitMax = 2147483647;
    public CaptureByteLimitMin = 10485760;
    public CaptureIntervalSecondsMax = 86300;
    public CaptureIntervalSecondsMin = 60;
    public MaxThroughputUnitsMax = 100;
    public MaxThroughputUnitsMin = 1;

    public MessageRetentionDaysError;
    public PartitionCountError;
    public CaptureByteLimitError;
    public CaptureIntervalSecondsError;
    public MaxThroughputUnitsError;

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

    public get WithCapture(): boolean {
        return this.Settings.WithCapture;
    }

    public set WithCapture(value: boolean) {
        this.Settings.WithCapture = value;
    }

    public get CaptureIntervalSeconds(): number {
        return parseInt(this.Settings.CaptureIntervalSeconds) ? parseInt(this.Settings.CaptureIntervalSeconds) : null;
    }

    public set CaptureIntervalSeconds(value: number) {
        this.Settings.CaptureIntervalSeconds = value ? parseInt(value.toString()) : null;
    }

    public get CaptureByteLimit(): number {
        return parseInt(this.Settings.CaptureByteLimit) ? parseInt(this.Settings.CaptureByteLimit) : null;
    }

    public set CaptureByteLimit(value: number) {
        this.Settings.CaptureByteLimit = value ? parseInt(value.toString()) : null;
    }

    public get MessageRetentionDays(): number {
        return parseInt(this.Settings.MessageRetentionDays) ? parseInt(this.Settings.MessageRetentionDays) : null;
    }

    public set MessageRetentionDays(value: number) {
        this.Settings.MessageRetentionDays = value ? parseInt(value.toString()) : null;
    }

    public get PartitionCount(): number {
        return parseInt(this.Settings.PartitionCount) ? parseInt(this.Settings.PartitionCount) : null;
    }

    public set PartitionCount(value: number) {
        this.Settings.PartitionCount = value ? parseInt(value.toString()) : null;
    }

    public get MaxThroughputUnits(): number {
        return parseInt(this.Settings.MaxThroughputUnits) ? parseInt(this.Settings.MaxThroughputUnits) : null;
    }

    public set MaxThroughputUnits(value: number) {
        this.Settings.MaxThroughputUnits = value ? parseInt(value.toString()) : null;
    }

    public get AutoInflate(): boolean {
        return this.Settings.AutoInflate;
    }

    public set AutoInflate(value: boolean) {
        this.Settings.AutoInflate = value;
    }

    public get ConfigureMessaging(): boolean {
        return this.Settings.ConfigureMessaging;
    }

    public set ConfigureMessaging(value: boolean) {
        this.Settings.ConfigureMessaging = value;
    }

	//	Constructors
constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef, protected flowSvc: FlowService) {
		super(container, routerHelpers, cdRef, flowSvc);

        if (!this.Settings) {
            this.Settings = {};
        }

        this.SettingsLoaded.subscribe(item => this.ModuleLoaded());

        this.MessageRetentionDaysError = "";
        this.PartitionCountError = "";
        this.CaptureByteLimitError = "";
        this.CaptureIntervalSecondsError = "";
        this.MaxThroughputUnitsError = "";
	}

	//	Runtime
	public ngOnInit() {
		super.ngOnInit();
	}

	//	API Methods
    public IsValid() {
        var isValid = true;

        this.MessageRetentionDaysError = "";
        this.PartitionCountError = "";
        this.CaptureByteLimitError = "";
        this.CaptureIntervalSecondsError = "";
        this.MaxThroughputUnitsError = "";

        if (!(this.MessageRetentionDaysMin <= this.MessageRetentionDays && this.MessageRetentionDays <= this.MessageRetentionDaysMax)) {
            isValid = false;
            this.MessageRetentionDaysError = "Must be an integer value between " + this.MessageRetentionDaysMin.toString() + " and " + this.MessageRetentionDaysMax.toString();
        }

        if (!(this.PartitionCountMin <= this.PartitionCount && this.PartitionCount <= this.PartitionCountMax)) {
            isValid = false;
            this.PartitionCountError = "Must be an integer value between " + this.PartitionCountMin.toString() + " and " + this.PartitionCountMax.toString();
        }

        if (!(this.CaptureByteLimitMin <= this.CaptureByteLimit && this.CaptureByteLimit <= this.CaptureByteLimitMax)) {
            isValid = false;
            this.CaptureByteLimitError = "Must be an integer value between " + this.CaptureByteLimitMin.toString() + " and " + this.CaptureByteLimitMax.toString();
        }

        if (!(this.CaptureIntervalSecondsMin <= this.CaptureIntervalSeconds && this.CaptureIntervalSeconds <= this.CaptureIntervalSecondsMax)) {
            isValid = false;
            this.CaptureIntervalSecondsError = "Must be an integer value between " + this.CaptureIntervalSecondsMin.toString() + " and " + this.CaptureIntervalSecondsMax.toString();
        }

        if (!(this.MaxThroughputUnitsMin <= this.MaxThroughputUnits && this.MaxThroughputUnits <= this.MaxThroughputUnitsMax)) {
            isValid = false;
            this.MaxThroughputUnitsError = "Must be an integer value between " + this.MaxThroughputUnitsMin.toString() + " and " + this.MaxThroughputUnitsMax.toString();
        }

        return isValid;
    }
    public Save() {
        if (this.IsValid())
            super.Save();
    }

    public ModuleLoaded()
    {
        if (this.Settings.AutoInflate == null || this.Settings.AutoInflate == undefined)
            this.Settings.AutoInflate = true;
        if (!this.Settings.MaxThroughputUnits)
            this.Settings.MaxThroughputUnits = 1;
        if (!this.Settings.MessageRetentionDays)
            this.Settings.MessageRetentionDays = 7;
        if (!this.Settings.PartitionCount)
            this.Settings.PartitionCount = 32;
        if (!this.Settings.CaptureByteLimit)
            this.Settings.CaptureByteLimit = 10485760;
        if (!this.Settings.CaptureIntervalSeconds)
            this.Settings.CaptureIntervalSeconds = 60;
    }
}
