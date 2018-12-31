import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterHelpersService } from "@lcu/routing";
import { ForgeOrganizationService } from '@lcu/daf-common';
import { BaseResponse, isResultSuccess } from '@lcu/core';
import { Status } from '@lcu/common';

@Component({
	selector: 'app-configure',
	templateUrl: './configure.html',
	styleUrls: ['./configure.scss']
})
export class ConfigureComponent implements OnInit {
	//  Fields

	//  Properties
	public ConfigureFormGroup: FormGroup;

	public Error: string;

	public Loading: boolean;

	//  Constructors
	constructor(protected formBldr: FormBuilder, protected orgSvc: ForgeOrganizationService) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.ConfigureFormGroup = this.formBldr.group({
			host: ['', Validators.required]
		});
	}

	//	API Methods
	public HandleConfigure() {
		this.Loading = true;

		this.Error = null;

		var host = this.ConfigureFormGroup.get('host').value;

		this.orgSvc.Configure(host)
			.subscribe((result: BaseResponse) => {
				if (isResultSuccess(result)) {
					window.location.href = `http://${host}`;
				} else {
					console.log(result);

					this.Error = result.Status.Message;

					this.Loading = false;
				}
			},
				(error: any) => {
					this.handleUnkownError(error);
				});
	}

	//	Helpers
	protected handleUnkownError(error: any) {
		console.log(error);

		var err = <any>{ HTTPError: error };

		var errStatus = <Status>err;

		errStatus.Code = 1;

		errStatus.Message = 'There was an unknown issue.  Please try again and contact support if the problem continues.';

		this.Error = errStatus.Message;

		this.Loading = false;
	}
}
