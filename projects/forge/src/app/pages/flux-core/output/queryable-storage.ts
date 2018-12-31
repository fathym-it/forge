import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { FlowService, SchemaFlowService } from '@lcu/flux';
import { isResultSuccess } from '@lcu/core';

@Component({
    selector: 'app-queryable-storage',
    templateUrl: './queryable-storage.html',
})
export class QueryableStorageComponent extends BaseModuleManagerComponent implements OnInit {
    //	Fields

    //	Properties
    public PartitionKeyError: string;

    public CaptureByteLimitError: string;
    public ThroughputUnitMin = 1000;
    public ThroughputUnitMax = 10000;

    public SchemaProperties = [];
    public DisablePartitionKey: boolean;
    public ShowPartitionKey: boolean;

    public ThroughputUnitError;

    public get Description(): string {
        return this.Settings.Description;
    }

    public set Description(value: string) {
        this.Settings.Description = value;
    }

    public get DatabaseId(): string {
        this.checkSettingsObject();

        return this.Settings.CollectionSettings.DatabaseId;
    }

    public set DatabaseId(value: string) {
        this.Settings.CollectionSettings.DatabaseId = value.toLowerCase();
        this.Settings.Lookup = value.toLowerCase();
    }

    public get CollectionId(): string {
        this.checkSettingsObject();

        return this.Settings.CollectionSettings.CollectionId;
    }

    public set CollectionId(value: string) {
        this.Settings.CollectionSettings.CollectionId = value.toLowerCase();

        //this.Settings.Lookup = value.toLowerCase();
        this.Settings.SubLookup = value.toLowerCase();
    }

    public get Lookup() {
        return this.Settings.Lookup;
    }

    public get PartitionKey(): string {
        this.checkSettingsObject();

        return this.Settings.CollectionSettings.PartitionKey;
    }

    public set PartitionKey(value: string) {
        this.Settings.CollectionSettings.PartitionKey = value;
    }

    public get ThroughputRequestUnits(): number {
        return this.Settings.CollectionSettings.ThroughputRequestUnits;
    }

    public set ThroughputRequestUnits(value: number) {
        var rounded = value;

        if (value >= 1000) {
            var ceil = Math.ceil(value / 100) * 100;
            var floor = Math.floor(value / 100) * 100;
            if ((ceil - value) < (value - floor))
                rounded = ceil;
            else rounded = floor;
        }

        this.Settings.CollectionSettings.ThroughputRequestUnits = rounded;
    }

    //	Constructors
    constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef,
        protected flowSvc: FlowService, protected schemaFlowSvc: SchemaFlowService) {
        super(container, routerHelpers, cdRef, flowSvc);

        this.checkSettingsObject();

        this.SettingsLoaded.subscribe(item => this.ModuleLoaded());

        this.ThroughputUnitError = "";

        this.DisablePartitionKey = false;

        this.ShowPartitionKey = false;

        this.PartitionKeyError = "";
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

    public ModuleLoaded() {
        this.checkSettingsObject();
        var self = this;

        this.PartitionKeyError = "";

        var hasSchema = self.IncommingModules && self.IncommingModules.length > 0 && self.IncommingModules.filter(function (item) {
            return item.schemaId != '';
        }).length > 0;

        if (hasSchema) {
            this.schemaFlowSvc.GetAllJSONSchemas(this.FlowID).subscribe(
                (results) => {
                    if (isResultSuccess(results)) {
                        var nodes = self.IncommingModules.filter(function (item) {
                            return item.schemaId != '';
                        });

                        nodes.forEach(function (node) {
                            var schemas = results.Model.filter(function (item) {
                                return item.ID == node.schemaId;
                            });

                            if (schemas.length > 0) {
                                var schema = schemas[0];

                                Object.keys(schema.Schema.properties).forEach(function (key) {
                                    var prop = schema.Schema.properties[key].title;

                                    if (self.SchemaProperties.indexOf(prop) == -1)
                                        self.SchemaProperties.push(prop);
                                });
                            }
                        });

                        self.SchemaProperties.sort();

                    } else {
                        console.log(results);
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => {

                });
        }

        if (!this.Settings.CollectionSettings.ThroughputRequestUnits || this.Settings.CollectionSettings.ThroughputRequestUnits < 1000)
            this.Settings.CollectionSettings.ThroughputRequestUnits = 1000;

        if (this.Settings.CollectionSettings.PartitionKey)
            this.DisablePartitionKey = true;

        if (self.IncommingModules && self.IncommingModules.length > 0)
            this.ShowPartitionKey = true;

        if (this.ShowPartitionKey && !this.DisablePartitionKey)
            this.PartitionKeyError = "Please Select a Partition Key";
    }

    public CanSave() {
        return this.IsValid() && this.LookupValid && this.SubLookupValid && !this.ServerError && !this.ServerErrorSubLookup && !this.ThroughputUnitError;
    }

    public ValidatePartitionKey() {
        this.PartitionKeyError = "";

        if (!this.PartitionKey && this.ShowPartitionKey && !this.DisablePartitionKey)
            this.PartitionKeyError = "Please Select a Partition Key";
    }

    public IsValid() {
        var isValid = true;

        this.ThroughputUnitError = "";

        if (this.ThroughputRequestUnits && !(this.ThroughputUnitMin <= this.ThroughputRequestUnits && this.ThroughputRequestUnits <= this.ThroughputUnitMax)) {
            isValid = false;
            this.ThroughputUnitError = "Must be an integer value between " + this.ThroughputUnitMin.toString() + " and " + this.ThroughputUnitMax.toString();
        }


        return isValid;
    }

    public Save() {
        if (this.IsValid()) {
            if (!this.ShowPartitionKey || !this.Settings.CollectionSettings.PartitionKey)
                this.Settings.HasErrors = true;
            else
                this.Settings.HasErrors = false;

            super.Save();
        }
    }

    protected checkSettingsObject() {
        if (!this.Settings)
            this.Settings = {};

        if (!this.Settings.CollectionSettings)
            this.Settings.CollectionSettings = {};
    }
}
