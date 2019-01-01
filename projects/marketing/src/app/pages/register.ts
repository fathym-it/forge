import { Component, OnInit } from '@angular/core';

import { Status } from '@lcu/common';
import { PageUIService } from '@lcu/daf-common';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
	//	Properties

	//	Constructors
	constructor(protected pgUiSvc: PageUIService) {
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
    public OnRegistered(status: Status) {
        this.pgUiSvc.Notify.Signal("Registration Successful, redirecting to The Forge", 5000);

		window.location.href = '/forge/registered';
	}
}
