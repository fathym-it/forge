import { Component, Input, OnInit, Output, EventEmitter, ViewChild, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { Loading, isStatusSuccess, BaseResponse, isResultSuccess } from '@lcu/common';
import { PowerBIConfig, ReportingConfig, ReportingService, ReportingConfigContext, PageUIService } from '@lcu/core';



@Component({
    selector: 'forge-solution-reporting-manage',
    templateUrl: './reporting-manage.component.html',
    styleUrls: ['./reporting-manage.component.scss']
})
export class ForgeReportingSolutionManage extends ForgeGenericSolution
    implements ISolutionControl, OnInit {
    //  Fields

    //  Properties
    public get CurrentPowerBIConfig(): PowerBIConfig {
        return this.ReportingConfig.PowerBIConfigs["default"];     
    }

    public Loading: Loading;

    public PowerBIFormGroup: FormGroup;

    public ReportingConfig: ReportingConfig;

    public Test: string = "Test";

    //  Constructors
    constructor(protected reportSvc: ReportingService, protected reportingConfig: ReportingConfigContext, protected pgUiSvc: PageUIService, protected formBldr: FormBuilder, protected injector: Injector,) {
        super(injector);

        this.Loading = new Loading();
    }

    //	Life Cycle
    public ngOnInit() {
        super.ngOnInit();

        this.reportingConfig.Loading.subscribe(loading => this.Loading.Set(loading));

        this.reportingConfig.Context.subscribe(reportingConfig => this.ReportingConfig = reportingConfig);

        this.PowerBIFormGroup = this.formBldr.group({
            username: new FormControl(),
            password: new FormControl(),
            apiUrl: new FormControl(),
            authorityUrl: new FormControl(),
            clientId: new FormControl(),
            groupId: new FormControl(),
            resourceUrl: new FormControl(),
        });
    }


    //	API Methods
    public Save() {
        this.Loading.Set(true);

        var pbiConfig = this.buildPowerBIConfigFromForm();

        this.ReportingConfig.PowerBIConfigs["default"] = pbiConfig;

        this.reportingConfig.Save(this.ReportingConfig).subscribe(
            (status) => {
                if (isStatusSuccess(status)) {
                    this.pgUiSvc.Notify.Signal("Reporting Configuration saved successfully");
                } else {
                    console.log(status);

                    this.pgUiSvc.Notify.Signal(status.Message);
                }
            },
            (err) => {
                console.log(err);

                this.pgUiSvc.Notify.Signal("Unknown error. Please try again, or contact support if the problem continues");
            },
            () => {
                this.Loading.Set(false);
            });
    }

    //	Helpers
    protected buildPowerBIConfigFromForm(): PowerBIConfig {
        return {
            Username: this.PowerBIFormGroup.get('username').value || this.CurrentPowerBIConfig.Username,
            Password: this.PowerBIFormGroup.get('password').value || this.CurrentPowerBIConfig.Password,
            ApiUrl: this.PowerBIFormGroup.get('apiUrl').value || this.CurrentPowerBIConfig.ApiUrl,
            AuthorityUrl: this.PowerBIFormGroup.get('authorityUrl').value || this.CurrentPowerBIConfig.AuthorityUrl,
            ClientID: this.PowerBIFormGroup.get('clientId').value || this.CurrentPowerBIConfig.ClientID,
            GroupID: this.PowerBIFormGroup.get('groupId').value || this.CurrentPowerBIConfig.GroupID,
            ResourceUrl: this.PowerBIFormGroup.get('resourceUrl').value || this.CurrentPowerBIConfig.ResourceUrl,
        };                               
    }

    protected handleNoConfig(): PowerBIConfig {
        return {
            Username: '',
            Password: '',
            ApiUrl: '',
            AuthorityUrl: '',
            ClientID: '',
            GroupID: '',
            ResourceUrl: '',
        };
    }
}   
