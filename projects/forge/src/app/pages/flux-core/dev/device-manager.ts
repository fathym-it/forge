import { ChangeDetectorRef, Component, ElementRef, OnInit, OnChanges, AfterViewInit, Inject } from '@angular/core';
import { RouterHelpersService } from "@lcu/routing";

import { jsPlumbToolkitUtil } from "jsplumbtoolkit";
import { isResultSuccess } from '@lcu/core';
import { BaseModuleManagerComponent } from '../controls/core';
import { CronOptions } from 'cron-editor';
import { MatRadioChange } from '@angular/material';
import { Device, ForgeJSONSchema, DeviceStatus, ConnectionState, DeviceAuthenticationMethod } from '@lcu/apps';
import { SchemaFlowService, FlowService, DeviceService } from '@lcu/flux';

export class SimulationProperty {
    public name: string;
    public id: string;
    public value: string | any[];
    public type: string;
    public identifier: boolean;
    public error: string;
    public extraData: {}
};

@Component({
    selector: 'app-device-manager',
    templateUrl: './device-manager.html'
})
export class DeviceManagerComponent extends BaseModuleManagerComponent implements OnChanges, OnInit, AfterViewInit {
    //	Fields

    //	Properties
    public get Lookup(): string {
        return this.Settings.Lookup;
    }

    public set Lookup(value: string) {
        this.Settings.Lookup = value.toLowerCase();
    }

    public get DataSource(): string {
        return this.Settings.DataSource;
    }

    public set DataSource(value: string) {
        this.Settings.DataSource = value;
    }

    public DeviceStatus: any;

    public ConnectionState: any;

    public DeviceError: string;

    public SelectAll: boolean;

    public CurrentViewingDevice: string;

    public NewDeviceName: string;

    public NewDeviceID: string;

    public OrgDevices: Device[];

    public Devices: Device[];

    public CanSave: boolean;

    public IOTConnected: boolean;

    public IOTProvisioned: boolean;

    public IOTModuleID: string;

    public DevicesLoading: boolean;

    public ContainsFunctions: boolean;

    public DisableSchemaEdit: boolean;

    public DisableSchemaEditEmulated: boolean;

    public Schemas: ForgeJSONSchema[];

    public SchemaType: string;

    public Loading: boolean;

    public HangingIncommingSchemas: any[];

    public HangingOutgoingSchemas: any[];

    public OutgoingSchemas: any[];

    public ShouldSaveSchema: boolean;

    public ShouldSaveSchemaEmulated: boolean;

    public CronExpression: string;

    public cronOptions = <CronOptions>{
        formInputClass: 'form-control cron-editor-input',
        formSelectClass: 'form-control cron-editor-select',
        formRadioClass: 'cron-editor-radio',
        formCheckboxClass: 'cron-editor-checkbox',

        defaultTime: "10:00:00",

        hideSeconds: false,
        hideMinutesTab: false,
        hideHourlyTab: false,
        hideDailyTab: false,
        hideWeeklyTab: false,
        hideMonthlyTab: false,
        hideYearlyTab: true,
        hideAdvancedTab: true,
        use24HourTime: true
    };

    public get CronTimerFrequency(): string {
        return this.Settings.CronTimerFrequency;
    }

    public set CronTimerFrequency(value: string) {
        this.Settings.CronTimerFrequency = value;
    }

    public get Description(): string {
        if (!this.Settings)
            return '';
        return this.Settings.Description;
    }

    public set Description(value: string) {
        this.Settings.Description = value;
    }

    public DeviceIDHelperOptions: string[];

    public get DeviceCount(): number {
        return this.Settings.DeviceCount;
    }

    public set DeviceCount(value: number) {
        this.Settings.DeviceCount = value;
    }

    public get DeviceIDFormat(): string {
        return this.Settings.DeviceIDFormat;
    }

    public set DeviceIDFormat(value: string) {
        this.Settings.DeviceIDFormat = value;
    }

    public get Schema(): ForgeJSONSchema {
        return this.Settings.Schema;
    }

    public set Schema(value: ForgeJSONSchema) {
        this.Settings.Schema = value;
    }

    public get SchemaEmulated(): ForgeJSONSchema {
        return this.Settings.SchemaEmulated;
    }

    public set SchemaEmulated(value: ForgeJSONSchema) {
        this.Settings.SchemaEmulated = value;
    }

    public get Simulation(): SimulationProperty[] {
        return this.Settings.Simulation;
    }

    public set Simulation(value: SimulationProperty[]) {
        this.Settings.Simulation = value;
    }

    public SimulationHelperOptions: any[];

    public get SimulationPropertiesKeys(): string[] {
        return this.Simulation.map(function (item) { return item.name });
    }

    //
    constructor(protected container: ElementRef, protected routerHelpers: RouterHelpersService, protected cdRef: ChangeDetectorRef,
        protected schemaFlowSvc: SchemaFlowService, protected flwSvc: FlowService, protected deviceService: DeviceService) {
        super(container, routerHelpers, cdRef, flwSvc);

        if (!this.Settings)
            this.Settings = {};

        this.DeviceStatus = DeviceStatus;

        this.ConnectionState = ConnectionState;

        this.IOTConnected = false;

        this.IOTProvisioned = false;

        this.DevicesLoading = false;

        this.Loading = true;

        this.CronExpression = '0 */5 * * * *';

        this.DeviceIDHelperOptions = [
            "Test-{uid}",
            "Test-{index}"
        ];

        this.SimulationHelperOptions = [
            { id: "{uid}", type: 'string', params: false },
            { id: "{now}", type: 'datetime', params: false },
            { id: "{now}", type: 'string', params: false },
            { id: "{deviceId}", type: 'string', params: false },
            { id: "{moveBy(x.xx)}", type: 'number', params: true },
            { id: "{random(min, max)}", type: 'number', params: true },
            { id: "{random(min, max)}", type: 'integer', params: true },
            { id: "{random}", type: 'string', params: false },
            { id: "{randomPrefix(count)}", type: 'string', params: true },
            { id: "{randomPredicate(count)}", type: 'string', params: true },
            { id: "{randomFromList}", type: 'integer', params: true },
            { id: "{randomFromList}", type: 'number', params: true },
            { id: "{randomFromList}", type: 'string', params: true }
        ];

        this.SettingsLoaded.subscribe(item => this.InitData());

        this.CanSave = true;
    }

    //	Runtime
    public ngOnChanges() {
        this.SetCanSave();
    }

    public ngAfterViewInit() {

    }

    public ngOnInit() {
        super.ngOnInit();

        this.ShouldSaveSchema = true;

        this.ShouldSaveSchemaEmulated = true;

        this.DisableSchemaEdit = false;

        this.DisableSchemaEditEmulated = false;

        this.SelectAll = false;

        //this.Schemas = this.Settings.Schemas;

        this.ContainsFunctions = true;

        this.SchemaType = 'outgoing';

        this.HangingIncommingSchemas = [];

        this.HangingOutgoingSchemas = [];

        this.OutgoingSchemas = [];

        if (!this.Settings)
            this.Settings = {};

        if (!this.Settings.Schema)
            this.Settings.Schema = <ForgeJSONSchema>{ properties: {} };

        if (!this.Settings.SchemaEmulated)
            this.Settings.SchemaEmulated = <ForgeJSONSchema>{ properties: {} };

        if (!this.Settings.Simulation)
            this.Settings.Simulation = new Array<SimulationProperty>();

        this.SetCanSave();
    }

    //	API Methods
    public ClickSelect(oldVal: any) {
        oldVal.Selected = !oldVal.Selected;

        var all = true;

        this.Devices.forEach(function (device) {
            if (!device.Selected)
                all = false;
        });

        this.SelectAll = all;
    }

    public ClickSelectAll() {
        if (this.SelectAll) {
            this.Devices.forEach(function (device) {
                device.Selected = false;
            });

            this.SelectAll = false;
        }
        else {
            this.Devices.forEach(function (device) {
                device.Selected = true;
            });

            this.SelectAll = true;
        }
    }

    public IsViewingDevice(deviceId: string) {
        return this.CurrentViewingDevice == deviceId;
    }

    public SetViewingDevice(deviceId: string) {
        this.CurrentViewingDevice = deviceId;
    }

    public CanRegisterDevice() {
        return this.NewDeviceName && this.NewDeviceID;
    }

    public DisableSchemaEditChanged(val: boolean) {
        this.DisableSchemaEdit = val;

        if (val)
            this.ShouldSaveSchema = false;
        else
            this.ShouldSaveSchema = true;
    }

    public DisableSchemaEditChangedEmulated(val: boolean) {
        this.DisableSchemaEditEmulated = val;

        if (val)
            this.ShouldSaveSchemaEmulated = false;
        else
            this.ShouldSaveSchemaEmulated = true;
    }

    public UsingHangingSchemaChanged(val: string) {

    }

    public UsingExistingOutgoingChanged(val: string) {

    }

    public GetPropertiesLength() {
        return Object.keys(this.Schema.properties).length;
    }

    public GetPropertiesLengthEmulated() {
        return Object.keys(this.SchemaEmulated.properties).length;
    }

    public PivotProperties() {
        if (this.SchemaEmulated) {
            return this.recurseProperties(JSON.parse(JSON.stringify(this.SchemaEmulated)), '');
        }
    }

    public PropertiesChanged(properties: SimulationProperty[]) {
        this.Simulation = properties;
        var self = this;

        setTimeout(function () {
            self.SetCanSave();
        }, 500);

    }

    public PropertyAdded(schema: ForgeJSONSchema) {
        this.recursePropsForIDs(this.Schema);
    }

    public PropertyAddedEmulated(schema: ForgeJSONSchema) {
        this.recursePropsForIDs(this.SchemaEmulated);
    }

    private recurseSchemaForSimulation(schema: ForgeJSONSchema, parent: SimulationProperty) {
        var self = this;

        Object.keys(schema.properties).forEach(function (key) {
            var sim = self.Simulation.filter(function (item) {
                return item.id == schema.properties[key].id;
            })[0];

            if (parent) {
                sim.name = sim.name.replace(parent.name + ">", "");
                (<Array<any>>parent.value).push(sim);

                var idx = -1;
                for (var i = 0; i < self.Simulation.length; i++) {
                    if (self.Simulation[i].id == sim.id)
                        idx = i;
                }

                if (idx > -1)
                    self.Simulation.splice(idx, 1);
            }

            if (schema.properties[key].type == 'object') {
                sim.value = new Array();
                self.recurseSchemaForSimulation(schema.properties[key].oneOf[0], sim);
            }
        });
    }

    public GetSimulation() {
        return this.Simulation;
    }

    private recurseSchemaForSimulationLoad(parent: SimulationProperty, index: number) {
        var self = this;

        if (index > -1)
            self.Simulation.splice(index + 1, 0, parent);

        if (parent.type == "object") {
            var idx = -1;

            for (var i = 0; i < self.Simulation.length; i++) {
                if (self.Simulation[i].id == parent.id)
                    idx = i;
            }

            if (idx > -1) {
                (<Array<any>>parent.value).forEach(function (item) {
                    item.name = parent.name + ">" + item.name;
                    self.recurseSchemaForSimulationLoad(item, idx);
                    idx++;
                });

                parent.value = "";
            }
        }
    }

    private recursePropsForIDs(schema: ForgeJSONSchema) {
        var self = this;

        Object.keys(schema.properties).forEach(function (key) {
            if (schema.properties[key].id.indexOf("temp") > -1)
                schema.properties[key].id = jsPlumbToolkitUtil.uuid();
            if (schema.properties[key].type == 'object')
                self.recursePropsForIDs(schema.properties[key].oneOf[0])
        });
    }

    public PropertyTypeChanged(schema: ForgeJSONSchema) {
        //this.Schema = schema;
    }

    public PropertyTypeChangedEmulated(schema: ForgeJSONSchema) {
        //this.Schema = schema;
    }

    public PropertyDeleted(schema: ForgeJSONSchema) {
        //this.Schema = schema;
    }

    public PropertyDeletedEmulated(schema: ForgeJSONSchema) {
        //this.Schema = schema;
    }

    public CheckSave() {
        var save = !this.CanSave || !this.Lookup || !this.Description || !this.LookupValid;

        return save;
    }

    public Save() {
        this.Saving = true;

        if (this.Schema && !this.Schema.id)
            this.Schema.id = jsPlumbToolkitUtil.uuid();

        if (this.SchemaEmulated && !this.SchemaEmulated.id)
            this.SchemaEmulated.id = jsPlumbToolkitUtil.uuid();

        var self = this;

        this.Settings.CronExpression = "0 */5 * * * *"; //this.CronExpression; TODO: Change this back once CRON EDITOR working!!

        if (this.SchemaEmulated && this.SchemaEmulated.id && this.SchemaEmulated.title && this.SchemaEmulated.properties && Object.keys(this.SchemaEmulated.properties).length > 0)
            this.recurseSchemaForSimulation(this.SchemaEmulated, null);

        if (this.ShouldSaveSchema && this.Schema && this.Schema.id && this.Schema.title) {
            return this.schemaFlowSvc.SaveJSONSchema(this.Schema).subscribe(
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
                    if (this.ShouldSaveSchemaEmulated && this.SchemaEmulated && this.SchemaEmulated.id && this.SchemaEmulated.title) {
                        return this.schemaFlowSvc.SaveJSONSchema(this.SchemaEmulated).subscribe(
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
                                var sid = this.Schema ? this.Schema.id : null;
                                this.Schema = null;
                                this.Settings.Schema = null;
                                this.Settings.SchemaID = sid;
                                this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                                this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;

                                var id = this.SchemaEmulated ? this.SchemaEmulated.id : null;
                                this.SchemaEmulated = null;
                                this.Settings.SchemaEmulated = null;
                                this.Settings.SchemaEmulatedID = id;
                                this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                                this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;
                                super.Save();
                            });
                    }
                    else {
                        var sid = this.Schema ? this.Schema.id : null;
                        this.Schema = null;
                        this.Settings.Schema = null;
                        this.Settings.SchemaID = sid;
                        this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                        this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;

                        var id = this.SchemaEmulated ? this.SchemaEmulated.id : null;
                        this.SchemaEmulated = null;
                        this.Settings.SchemaEmulated = null;
                        this.Settings.SchemaEmulatedID = id;
                        this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                        this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;
                        super.Save();
                    }
                });
        }
        else if (this.ShouldSaveSchemaEmulated && this.SchemaEmulated && this.SchemaEmulated.id && this.SchemaEmulated.title) {
            return this.schemaFlowSvc.SaveJSONSchema(this.SchemaEmulated).subscribe(
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
                    var sid = this.Schema ? this.Schema.id : null;
                    this.Schema = null;
                    this.Settings.Schema = null;
                    this.Settings.SchemaID = sid;
                    this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                    this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;

                    var id = this.SchemaEmulated ? this.SchemaEmulated.id : null;
                    this.SchemaEmulated = null;
                    this.Settings.SchemaEmulated = null;
                    this.Settings.SchemaEmulatedID = id;
                    this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
                    this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;
                    super.Save();
                });
        }
        else {
            var sid = this.Schema ? this.Schema.id : null;
            this.Schema = null;
            this.Settings.Schema = null;
            this.Settings.SchemaID = sid;
            this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
            this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;

            var id = this.SchemaEmulated ? this.SchemaEmulated.id : null;
            this.SchemaEmulated = null;
            this.Settings.SchemaEmulated = null;
            this.Settings.SchemaEmulatedID = id;
            this.Settings.DisableSchemaEdit = this.DisableSchemaEdit;
            this.Settings.DisableSchemaEditEmulated = this.DisableSchemaEditEmulated;
            super.Save();
        }
    }

    public SetCanSave() {
        if (this.Settings) {
            var self = this;
            this.CanSave = true;

            if (this.Simulation && this.Simulation.filter(function (item) {
                return item.error
            }).length > 0)
                this.CanSave = false;

            if (this.DataSource == "Emulated" && (!this.SchemaEmulated || !this.SchemaEmulated.id || !this.SchemaEmulated.properties || this.GetPropertiesLengthEmulated() == 0))
                this.CanSave = false;

            if (this.DataSource == "Emulated" && (!this.DeviceCount || !this.DeviceIDFormat))
                this.CanSave = false;

            //this.CanSave = Object.keys(this.Simulation.Properties).filter(function (key) {
            //    return !self.Simulation.Properties[key].Value
            //}).length == 0;
        } else {
            this.CanSave = false;
        }
    }

    public SchemaChanged(schema: ForgeJSONSchema) {
        if (schema.id)
            this.Schema = schema;

        this.SetCanSave();
    }

    public SchemaChangedEmulated(schema: ForgeJSONSchema) {
        if (schema.id)
            this.SchemaEmulated = schema;

        this.SetCanSave();
    }

    public TabChanged(event: any) {
        if (event.index == 2) {
            //this.SetCanSave();
        }
    }

    public EnableDevices() {
        this.DevicesLoading = true;
        var self = this;
        var devices = this.Devices.filter(function (item) { return item.Selected });
        devices.forEach(function (item) {
            item.Status = DeviceStatus.Enabled;
        });

        this.flowSvc.UpdateDevices(this.FlowID, this.getEnvironment(), this.IOTModuleID, devices).subscribe(
            (results) => {
                if (isResultSuccess(results)) {
                    results.Model.Items.forEach(function (item) {
                        var existing = self.Devices.filter(function (dev) {
                            return dev.DeviceID == item.DeviceID;
                        })[0];

                        existing.AuthMethod = item.AuthMethod;
                        existing.ConnectionState = item.ConnectionState;
                        existing.ConnectionString = item.ConnectionString;
                        existing.PrimaryKey = item.PrimaryKey;
                        existing.SecondaryKey = item.SecondaryKey;
                        existing.Status = item.Status;
                    });
                }

                this.Devices.forEach(function (item) {
                    item.Selected = false;
                });

                this.SelectAll = false;
                this.DevicesLoading = false;
            });
    }

    public DisableDevices() {
        this.DevicesLoading = true;
        var self = this;
        var devices = this.Devices.filter(function (item) { return item.Selected });
        devices.forEach(function (item) {
            item.Status = DeviceStatus.Disabled;
        });

        this.flowSvc.UpdateDevices(this.FlowID, this.getEnvironment(), this.IOTModuleID, devices).subscribe(
            (results) => {
                if (isResultSuccess(results)) {
                    results.Model.Items.forEach(function (item) {
                        var existing = self.Devices.filter(function (dev) {
                            return dev.DeviceID == item.DeviceID;
                        })[0];

                        existing.AuthMethod = item.AuthMethod;
                        existing.ConnectionState = item.ConnectionState;
                        existing.ConnectionString = item.ConnectionString;
                        existing.PrimaryKey = item.PrimaryKey;
                        existing.SecondaryKey = item.SecondaryKey;
                        existing.Status = item.Status;
                    });
                }

                this.Devices.forEach(function (item) {
                    item.Selected = false;
                });

                this.SelectAll = false;
                this.DevicesLoading = false;
            });
    }

    public UnregisterDevices() {
        this.DevicesLoading = true;
        var self = this;
        var deviceIds = this.Devices.filter(function (item) { return item.Selected }).map(x => x.DeviceID);

        this.flowSvc.UnregisterDevices(this.FlowID, this.getEnvironment(), this.IOTModuleID, deviceIds).subscribe(
            (results) => {
                if (isResultSuccess(results)) {
                    self.Devices.filter(function (item) { return item.Selected }).forEach(function (item) {
                        self.OrgDevices.push(item);
                    });

                    self.OrgDevices.sort(self.deviceSort);

                    self.Devices = self.Devices.filter(function (item) { return !item.Selected });
                }

                this.Devices.forEach(function (item) {
                    item.Selected = false;
                });

                this.SelectAll = false;
                this.DevicesLoading = false;
            });
    }

    public DevicesSelected() {
        return this.Devices.filter(function (item) {
            return item.Selected;
        }).length > 0;
    }

    public RegisterDevice() {
        this.DeviceError = "";
        var self = this;

        self.DevicesLoading = true;

        if (this.OrgDevices.filter(function (item) {
            return item.DeviceID == self.NewDeviceID;
        }).length == 0) {
            var newDevice = new Device();
            newDevice.Active = true;
            newDevice.Description = self.NewDeviceName;
            newDevice.DeviceID = self.NewDeviceID;
            newDevice.Lookup = self.NewDeviceName.split(' ').join('_');
            newDevice.Name = self.NewDeviceName;
            newDevice.Status = DeviceStatus.Enabled;
            newDevice.AuthMethod = DeviceAuthenticationMethod.SymmetricKey;
            newDevice.PrimaryKey = btoa(jsPlumbToolkitUtil.uuid());
            newDevice.SecondaryKey = btoa(jsPlumbToolkitUtil.uuid());

            this.deviceService.SaveOrgDevice(newDevice).subscribe(
                (results) => {
                    if (isResultSuccess(results)) {
                        newDevice.ID == results.Model;

                        self.flowSvc.RegisterDevice(self.FlowID, self.getEnvironment(), self.IOTModuleID, newDevice).subscribe(
                            (flwResults) => {
                                if (isResultSuccess(flwResults)) {
                                    newDevice.ConnectionState = flwResults.Model.ConnectionState;
                                    newDevice.ConnectionString = flwResults.Model.ConnectionString;

                                    self.Devices.push(newDevice);
                                    self.Devices.sort(self.deviceSort);
                                    self.NewDeviceID = '';
                                    self.NewDeviceName = '';
                                }
                                else if (flwResults.Status.Code == 3) {
                                    self.DeviceError = "Device already registered";
                                }
                                else {
                                    self.NewDeviceID = '';
                                    self.NewDeviceName = '';
                                }

                                self.DevicesLoading = false;
                            });
                    }
                    else if (results.Status.Code == 3) {
                        self.DevicesLoading = false;
                        self.DeviceError = "Device with the same device id already exists";
                    }
                    else {
                        self.DevicesLoading = false;
                        self.NewDeviceID = '';
                        self.NewDeviceName = '';
                    }
                });
        }
        else {
            var idx = -1;
            for (var i = 0; i < self.OrgDevices.length; i++) {
                if (self.OrgDevices[i].DeviceID == self.NewDeviceID)
                    idx = i;
            }

            var device = self.OrgDevices[idx];

            this.flowSvc.RegisterDevice(self.FlowID, self.getEnvironment(), self.IOTModuleID, device).subscribe(
                (results) => {
                    if (isResultSuccess(results)) {
                        var newDev = results.Model;
                        newDev.Active = device.Active;
                        newDev.Description = device.Description;
                        newDev.ID = device.ID;
                        newDev.Lookup = device.Lookup;
                        newDev.Name = device.Name;
                        self.Devices.push(results.Model);
                        self.Devices.sort(self.deviceSort);
                        self.OrgDevices.splice(idx, 1);
                        self.NewDeviceID = '';
                        self.NewDeviceName = '';
                    }
                    else if (results.Status.Code == 3)
                        self.DeviceError = "Device already registered";
                    else {
                        self.NewDeviceID = '';
                        self.NewDeviceName = '';
                    }

                    self.DevicesLoading = false;
                });
        }
    }

    public InitData() {
        var self = this;

        if (this.Simulation) {
            this.Simulation.forEach(function (item) {
                self.recurseSchemaForSimulationLoad(item, -1);
            });
        }

        if (this.Settings && !this.Settings.DataSource) {
            if (this.IOTConnected)
                this.Settings.DataSource = "Actual";
            else
                this.Settings.DataSource = "Emulated";

            this.SetCanSave();
        }


        this.schemaFlowSvc.GetAllJSONSchemas(this.FlowID).subscribe(//	TODO:  Filter to only Flow ID?
            (results) => {
                var schemas: ForgeJSONSchema[] = [];

                results.Model.forEach(incommingSchema => {
                    if (incommingSchema.Active && incommingSchema.Schema && incommingSchema.Schema.id)
                        schemas.push(incommingSchema.Schema);
                });

                this.Schemas = schemas;

                if (!this.Settings)
                    this.Settings = {};

                if (this.Settings.DisableSchemaEdit)
                    this.DisableSchemaEdit = this.Settings.DisableSchemaEdit;
                else
                    this.DisableSchemaEdit = false;

                if (this.Settings.DisableSchemaEditEmulated)
                    this.DisableSchemaEditEmulated = this.Settings.DisableSchemaEditEmulated;
                else
                    this.DisableSchemaEditEmulated = false;

                if (self.Settings && self.Settings.SchemaID) {
                    this.Schema = this.Schemas.filter(function (item) {
                        return item.id == self.Settings.SchemaID;
                    })[0];
                }
                else
                    this.Schema = <ForgeJSONSchema>{ properties: {} };

                if (self.Settings && self.Settings.SchemaEmulatedID) {
                    this.SchemaEmulated = this.Schemas.filter(function (item) {
                        return item.id == self.Settings.SchemaEmulatedID;
                    })[0];
                }
                else
                    this.SchemaEmulated = <ForgeJSONSchema>{ properties: {} };

                if (!this.Settings.Simulation)
                    this.Settings.Simulation = new Array<SimulationProperty>();

                this.Settings.Schema = this.Schema;
                this.Settings.SchemaEmulated = this.SchemaEmulated;

                if (this.DisableSchemaEdit)
                    this.ShouldSaveSchema = false;
                else
                    this.ShouldSaveSchema = true;

                if (this.DisableSchemaEditEmulated)
                    this.ShouldSaveSchemaEmulated = false;
                else
                    this.ShouldSaveSchemaEmulated = true;

                this.Loading = false;
            });

        if (this.Settings.CronExpression)
            this.CronExpression = this.Settings.CronExpression;

        if (this.OutgoingModules && this.OutgoingModules.length > 0 && this.OutgoingModules.filter(function (item) { return item.type == 'DeviceStream' }).length > 0) {
            this.IOTConnected = true;

            var iotMod = this.OutgoingModules.filter(function (item) { return item.type == 'DeviceStream' })[0];

            this.IOTModuleID = iotMod.id;

            if (iotMod.status.Code == 0)
                this.IOTProvisioned = true;

            if (this.IOTProvisioned) {
                var self = this;

                this.DevicesLoading = true;

                this.OrgDevices = new Array<Device>();
                this.Devices = new Array<Device>();

                this.deviceService.ListOrgDevices(1, 100000).subscribe(
                    (results) => {

                        this.flowSvc.ListDevices(this.FlowID, this.getEnvironment(), iotMod.id, 1, 100000).subscribe(
                            (devResults) => {
                                devResults.Model.Items.forEach(function (item) {
                                    var dev = new Device();
                                    dev.AuthMethod = item.AuthMethod;
                                    dev.ConnectionString = item.ConnectionString;
                                    dev.ConnectionState = item.ConnectionState;
                                    dev.DeviceID = item.DeviceID;
                                    dev.PrimaryKey = item.PrimaryKey;
                                    dev.SecondaryKey = item.SecondaryKey;
                                    dev.Status = item.Status;

                                    var devItem = results.Model.Items.filter(function (orgDev) {
                                        return orgDev.DeviceID == dev.DeviceID;
                                    })[0];

                                    if (devItem) {
                                        dev.Active = devItem.Active;
                                        dev.Description = devItem.Description;
                                        dev.ID = devItem.ID;
                                        dev.Lookup = devItem.Lookup;
                                        dev.Name = devItem.Name;
                                        self.Devices.push(dev);
                                    }
                                    else {
                                        var newDevice = new Device();
                                        newDevice.Active = true;
                                        newDevice.Description = dev.DeviceID;
                                        newDevice.DeviceID = dev.DeviceID;
                                        newDevice.Lookup = dev.DeviceID.split(' ').join('_');
                                        newDevice.Name = dev.DeviceID;
                                        newDevice.Status = dev.Status;
                                        newDevice.AuthMethod = dev.AuthMethod;
                                        newDevice.PrimaryKey = dev.PrimaryKey;
                                        newDevice.SecondaryKey = dev.SecondaryKey;

                                        self.deviceService.SaveOrgDevice(newDevice).subscribe(
                                            (results) => {
                                                if (isResultSuccess(results)) {
                                                    dev.Active = newDevice.Active;
                                                    dev.Description = newDevice.Description;
                                                    dev.ID = results.Model;
                                                    newDevice.ID = dev.ID;
                                                    dev.Lookup = newDevice.Lookup;
                                                    dev.Name = newDevice.Name;
                                                    self.Devices.push(dev);
                                                    self.OrgDevices.push(newDevice);
                                                }
                                            });
                                    }
                                });

                                results.Model.Items.forEach(function (item) {
                                    if (self.Devices.filter(function (dev) {
                                        return dev.ID == item.ID;
                                    }).length == 0) {
                                        var dev = new Device();
                                        dev.Active = item.Active;
                                        dev.AuthMethod = item.AuthMethod;
                                        dev.ConnectionString = item.ConnectionString;
                                        dev.Description = item.Description;
                                        dev.DeviceID = item.DeviceID;
                                        dev.ID = item.ID;
                                        dev.Lookup = item.Lookup;
                                        dev.Name = item.Name;
                                        dev.PrimaryKey = item.PrimaryKey;
                                        dev.SecondaryKey = item.SecondaryKey;

                                        self.OrgDevices.push(dev);
                                    }
                                });

                                self.Devices.sort(self.deviceSort);
                                self.OrgDevices.sort(self.deviceSort);

                                this.DevicesLoading = false;
                            });
                    });
            }
        }
    }

    public IsEmulatedChange(event: MatRadioChange) {
        this.SetCanSave();
    }

    //	Helpers
    protected deviceSort(a: Device, b: Device) {
        if (a.Name.toLowerCase() > b.Name.toLowerCase())
            return 1;
        else if (a.Name.toLowerCase() < b.Name.toLowerCase())
            return -1;
        else
            return 0;
    }

    protected getEnvironment() {
        var host = window.location.hostname.toLowerCase();

        if (host == 'localhost' || host == 'int-flow.fathym.com')
            return 'int';
        else if (host == 'stg-flow.fathym.com')
            return 'stg';
        else if (host == 'flow.fathym.com')
            return 'prd';

        return 'int';
    }

    protected recurseProperties(schema: ForgeJSONSchema, name: string) {
        var returnList: ForgeJSONSchema[] = [];

        if (!schema.properties)
            return returnList;

        var keys = Object.keys(schema.properties);

        keys.forEach(key => {
            if (name)
                schema.properties[key].title = name + '>' + schema.properties[key].title;

            returnList.push(schema.properties[key]);

            if (schema.properties[key].type == "object") {
                var list = this.recurseProperties(schema.properties[key].oneOf[0], schema.properties[key].title);
                list.forEach(item => {
                    returnList.push(item);
                });
            }
        });

        return returnList;
    }
}
