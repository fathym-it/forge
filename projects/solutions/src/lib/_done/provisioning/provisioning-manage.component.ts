import { Component, Input, OnInit, Output, EventEmitter, ViewChild, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { Loading, isStatusSuccess, BaseResponse, isResultSuccess } from '@lcu/common';
import { ProvisioningConfig, ProvisioningConfigContext, PageUIService } from '@lcu/core';



@Component({
    selector: 'forge-solution-provisioning-manage',
    templateUrl: './provisioning-manage.component.html',
    styleUrls: ['./provisioning-manage.component.scss']
})
export class ForgeProvisioningSolutionManage extends ForgeGenericSolution
    implements ISolutionControl, OnInit {
    //  Fields

    //  Properties
    public Loading: Loading;

    public ProvisioningConfig: ProvisioningConfig;

    //  Constructors
	constructor(protected provisioningConfig: ProvisioningConfigContext,
		protected pgUiSvc: PageUIService, protected formBldr: FormBuilder, protected injector: Injector) {
        super(injector);

        this.Loading = new Loading();
    }

    //	Life Cycle
    public ngOnInit() {
        super.ngOnInit();

        this.provisioningConfig.Loading.subscribe(loading => this.Loading.Set(loading));

        this.provisioningConfig.Context.subscribe(provisioningConfig => this.ProvisioningConfig = provisioningConfig);
    }


    //	API Methods
    public Save() {
        this.Loading.Set(true);

        this.provisioningConfig.Save(this.ProvisioningConfig).subscribe(
            (status) => {
                if (isStatusSuccess(status)) {
                    this.pgUiSvc.Notify.Signal("Provisioning Configuration saved successfully");
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
}   
