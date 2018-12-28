import { Component, OnInit } from '@angular/core';

import { Status, isStatusSuccess } from '@lcu/common';

@Component({
	selector: 'app-register',
	templateUrl: './register.html',
	styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
	//	Properties

	//	Constructors
	constructor() {
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public OnRegister(data: { Status: Status, RedirectTo: string }) {
		if (isStatusSuccess(data.Status))
			window.location.href = data.RedirectTo || '/forge';
	}
}
