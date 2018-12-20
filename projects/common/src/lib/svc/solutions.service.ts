import { Injectable } from '@angular/core';
import { CoreForgeSolutionModules } from '../core/solutions.core';
import { BaseSolutionsService } from '@lcu/solutions';

@Injectable({
	providedIn: 'root'
})
export class ForgeSolutionsService extends BaseSolutionsService {
	//	Fields

	//	Constructor

	//	API Methods

	//	Helpers
	protected initSolutionModules() {
		this.localSolutionModules = [
			...CoreForgeSolutionModules,
		];
	}
}
