import { Component, OnInit, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '../../solutions.core';
import { Loading, isStatusSuccess } from '@lcu/common';

@Component({
    selector: 'forge-solution-dashboard-manage',
    templateUrl: './dashboard-manage.component.html',
    styleUrls: ['./dashboard-manage.component.scss']
})
export class ForgeDashboardSolutionManage extends ForgeGenericSolution
    implements ISolutionControl, OnInit {
    //  Fields

    //  Properties

    //  Constructors
	constructor(protected injector: Injector) {
        super(injector);
    }

    //	Life Cycle


    //	API Methods

    //	Helpers
}   
