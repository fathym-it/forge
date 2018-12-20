import { CoreForgeBuilderDisplayModules } from './../core/builders.core';
import { Injectable, Type, Inject } from '@angular/core';
import { BaseBuildersService, ISolutionsService, DisplayModuleSetup } from '@lcu/elements';

@Injectable({
	providedIn: 'root'
})
export class ForgeBuildersService extends BaseBuildersService {
	//	Fields

	//	Constructors
	constructor(protected solutionsSvc: ISolutionsService) {
		super(solutionsSvc);
	}

	//	API Methods

	//	Helpers
	protected loadCoreDisplayModules(): DisplayModuleSetup[] {
		return CoreForgeBuilderDisplayModules;
	}
}
