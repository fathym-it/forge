import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgeOrganizationService } from '@lcu/daf-common';
import { BaseResponse, isResultSuccess } from '@lcu/core';
import { OrganizationModel } from '@lcu/apps';
import { Status } from '@lcu/common';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.html',
	styleUrls: ['./overview.scss']
})
export class OverviewComponent implements OnInit {
	//  Fields

	//  Properties
	public DetailsFormGroup: FormGroup;

	public Error: string;

	public Loading: boolean;

	//  Constructors
	constructor(protected formBldr: FormBuilder, protected orgSvc: ForgeOrganizationService, protected router: Router) {
	}

	//	Life Cycle
	public ngOnInit() {
		this.DetailsFormGroup = this.formBldr.group({
			name: ['', Validators.required],
			description: ['', Validators.required]
		});
	}

	//	API Methods
	public HandleCreate() {
		this.Loading = true;

		this.Error = null;

		var org = this.buildOrganizationModelFromForm();

		this.orgSvc.Save(org)
			.subscribe((result: BaseResponse) => {
				if (isResultSuccess(result)) {
					this.router.navigate(['./configure']);
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
	protected buildOrganizationModelFromForm(): OrganizationModel {
		return <OrganizationModel>{
			Name: this.DetailsFormGroup.get('name').value,
			Description: this.DetailsFormGroup.get('description').value
		};
	}

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
