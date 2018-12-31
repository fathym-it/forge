import { ChangeDetectorRef, Component, ElementRef, OnInit, Inject, ViewChild } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { BaseModuleManagerComponent } from '../controls/core';
import { MatSnackBar } from '@angular/material';
import { forkJoin } from 'rxjs';
import { isResultSuccess } from '@lcu/core';
import { ModuleSchemaLayoutBehavior, SchemaFlowService, FlowParser, ModuleSchemaLayoutConfiguration, FlowService } from '@lcu/flux';
import { ForgeJSONSchema } from '@lcu/apps';

@Component({
    selector: 'app-data-map',
    templateUrl: './data-map.html',
})
export class DataMapComponent extends BaseModuleManagerComponent implements OnInit {
    //	Fields

    //	Properties
    public StreamingUnitsMin = 1;
    public StreamingUnitsMax = 12;

    public StreamingUnitsError;

    public get Description(): string {
        if (!this.Settings) {
            this.Settings = {};
            this.Settings.Description = "";
        }
        return this.Settings.Description;
    }

    public set Description(value: string) {
        if (!this.Settings)
            this.Settings = {};

        this.Settings.Description = value;
    }

    public get Lookup(): string {
        return this.Settings.Lookup;
    }

    public set Lookup(value: string) {
        this.Settings.Lookup = value.toLowerCase();
    }

    public get StreamingUnits(): string {
        return this.Settings.StreamingUnits ? this.Settings.StreamingUnits : null;
    }

    public set StreamingUnits(value: string) {
        this.Settings.StreamingUnits = value;
    }

    public FlowLayout: any;

    public SnackBarConfig: any;

    public SettingsAreLoaded: boolean;

	@ViewChild('flowLayout')
	public ModuleSchemaLayoutBehavior: ModuleSchemaLayoutBehavior;

    //	Constructors
    constructor(public snackBar: MatSnackBar, protected schemaFlowSvc: SchemaFlowService, protected flowParser: FlowParser,
        protected ModuleSchemaLayoutConfiguration: ModuleSchemaLayoutConfiguration, protected container: ElementRef,
        protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef, protected flowSvc: FlowService) {
        super(container, routerHelpers, cdRef, flowSvc);

        if (!this.Settings)
            this.Settings = {};

        this.FlowLayout = {};

        this.SnackBarConfig = {
            duration: 4000,
            panelClass: ['snack-bar-container']
        };

        this.SettingsLoaded.subscribe(item => this.ModuleLoaded());

        this.SettingsAreLoaded = false;

        this.StreamingUnitsError = '';


    }

    //	Runtime
    public ngAfterViewInit() {

    }

    public ngOnInit() {
        super.ngOnInit();

        this.ModuleSchemaLayoutBehavior.Init(this.DataChanged, 200);

        this.ModuleSchemaLayoutBehavior.SetSchemaSavedCallback(this, this.SchemaSave);
        //this.ModuleSchemaLayoutBehavior.SetCloseModalCallback(this, this.SchemaSave);

        this.ModuleSchemaLayoutConfiguration.Init(this.ModuleSchemaLayoutBehavior, this.ModuleSchemaLayoutBehavior.NodeFactory,
            this.ModuleSchemaLayoutBehavior.BeforeStartConnect, this.ModuleSchemaLayoutBehavior.BeforeConnect,
            this.ModuleSchemaLayoutBehavior.BeforeStartDetach,
            this.ModuleSchemaLayoutBehavior.ToggleSelection, this.ModuleSchemaLayoutBehavior.RemoveEdge,
            this.ModuleSchemaLayoutBehavior.CanvasClick, this.ModuleSchemaLayoutBehavior.ObjectRepainted,
            this.ModuleSchemaLayoutBehavior.EdgeAdded, this.ModuleSchemaLayoutBehavior.EdgeMoved,
            this.ModuleSchemaLayoutBehavior.ModeChanged, this.ModuleSchemaLayoutBehavior.ConnectionClick
        );
    }

    //	API Methods
    public DataChanged() {

    }

    public InitializeFlow() {
        if (this.Settings && !this.SettingsAreLoaded) {
            this.SettingsAreLoaded = true;

            forkJoin(
				this.schemaFlowSvc.GetAllJSONSchemas(this.FlowID),//	TODO: Filter to only flow ID? this.FlowID
                this.schemaFlowSvc.GetAllSchemaFunctionDefinitions()
            ).subscribe(
                (results) => {
                    if (isResultSuccess(results[0]) && isResultSuccess(results[1])) {
                        var schemas: ForgeJSONSchema[] = [];

                        results[0].Model.forEach(incommingSchema => {
                            if (incommingSchema.Active && incommingSchema.Schema && incommingSchema.Schema.id)
                                schemas.push(incommingSchema.Schema);
                        });

                        this.ModuleSchemaLayoutBehavior.MapExistingFlow(this.Settings.SchemaFlow, schemas, results[1].Model,
                                this.IncommingModules, this.OutgoingModules, this.FlowID, this.ModuleTypeName);
                    } else if (!isResultSuccess(results[0])) {
                        console.log(results[0]);
                    }
                    else {
                        console.log(results[1]);
                    }
                },
                (err) => {
                    console.log(err);
                },
                () => {

                });
        }
    }

    public IsValid() {
        var isValid = true;

        if (this.StreamingUnits.toString().indexOf('.') > -1 || parseInt(this.StreamingUnits) < this.StreamingUnitsMin || parseInt(this.StreamingUnits) > this.StreamingUnitsMax) {
            this.StreamingUnitsError = "Streaming Units must be an integer between " + this.StreamingUnitsMin.toString() + " and " + this.StreamingUnitsMax.toString();

            isValid = false;
        }

        return isValid;
    }

    public ModuleLoaded() {
        if (!this.Settings.StreamingUnits)
            this.Settings.StreamingUnits = "3";

        this.ModuleSchemaLayoutBehavior.AfterViewInit(false, null, null);
    }

    public ShowError(errorDetails: { Error: string, Action: string }) {
        this.snackBar.open(errorDetails.Error, errorDetails.Action, this.SnackBarConfig);
    }

    public Save() {
        if (this.IsValid()) {
            var data = this.ModuleSchemaLayoutBehavior.ExportFlow();

            this.Settings.SchemaFlow = {
                SchemaNodes: data.SchemaNodes,
                SchemaMaps: data.SchemaMaps,
                SchemaFunctions: data.SchemaFunctions,
                SchemaFunctionReturns: data.SchemaFunctionReturns
            }

            this.Settings.HasErrors = data.HasErrors;

            super.Save();
        }
    }

    public SchemaSave(ctx: DataMapComponent, schema: ForgeJSONSchema) {
        return ctx.schemaFlowSvc.SaveJSONSchema(schema).subscribe(
            (results) => {
                if (isResultSuccess(results)) {

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
}
