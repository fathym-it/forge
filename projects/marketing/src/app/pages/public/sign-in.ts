import { Component, OnInit } from '@angular/core';

import { Status, isStatusSuccess } from '@lcu/common';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.html',
	styleUrls: ['./sign-in.scss']
})
export class SignInComponent implements OnInit {
	//	Properties

	//	Constructors
	constructor() {
	}

	//	Life Cycle
	public ngOnInit() {
	}

	//	API Methods
	public OnSignIn(data: { Status: Status, RedirectTo: string }) {
		if (isStatusSuccess(data.Status))
			window.location.href = data.RedirectTo || '/forge';
	}
}
