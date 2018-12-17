import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Status } from '@lcu/common';
import { LookupClaimModel, ApplicationModel } from 'projects/common/src/lib/core.api';
import { BaseModeledResponse } from '@lcu/core';

@Component({
	selector: 'applications-manage-security-dialog',
	templateUrl: './apps-manage-security.dialog.html',
	styleUrls: ['./apps-manage-security.dialog.scss']
})
export class AppsManageSecurityDialog implements OnInit {
	//	Properties
	public Application: ApplicationModel;

	public NewClaimType: string;

	public NewClaimValues: { [id: string]: string };

	//	Constructors
	constructor(protected dialogRef: MatDialogRef<AppsManageSecurityDialog>, @Inject(MAT_DIALOG_DATA) protected app: ApplicationModel) {
		this.Application = JSON.parse(JSON.stringify(app));

		if (!this.Application.Security)
			this.Application.Security = <any>{};

		if (!this.Application.Lookup)
			this.Application.Lookup = <any>{};

		this.NewClaimValues = {};
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public AddLookupClaim(claimType: string) {
		if (claimType) {
			this.Application.Lookup.Claims = [
				...(this.Application.Lookup.Claims || []),
				<LookupClaimModel>{ Type: claimType, Values: [] }
			];

			this.NewClaimType = '';
		}
	}

	public AddValue(claim: LookupClaimModel, value: string) {
		if (value) {
			claim.Values = [...(claim.Values || []), value];

			this.NewClaimValues[claim.Type] = '';
		}
	}

	public RemoveClaimValue(claim: LookupClaimModel, value: string) {
		claim.Values = claim.Values.filter(h => h != value);
	}

	public RemoveLookupClaim(claim: LookupClaimModel) {
		this.Application.Lookup.Claims = this.Application.Lookup.Claims.filter(c => c != claim);
	}

	public RemoveValue(claim: LookupClaimModel, value: string) {
		if (value) {
			claim.Values = claim.Values.filter(v => v != value);

			this.NewClaimValues[claim.Type] = '';
		}
	}

	public Save() {
		this.dialogRef.close(<BaseModeledResponse<ApplicationModel>>{
			Model: this.Application,
			Status: <Status>{
				Code: 0,
				Message: 'Success'
			}
		});
	}

	//	Helpers
}
