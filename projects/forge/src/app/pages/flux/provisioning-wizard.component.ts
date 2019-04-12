import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProvisioningWizardService } from './provisioning-wizard.service';

@Component({
    selector: 'app-provisioning-wizard',
    template:   `<h1>{{passedData.title}}</h1>
                 <lcu-dynamic-wizard 
                 [JSONQuestions]="passedData.questions"
                 (AnsweredQuestions)="HandleWizardResults($event)"></lcu-dynamic-wizard>`
})

export class ProvisioningWizardComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any, private wizardService: ProvisioningWizardService) {}

    /**
     * 
     * @param answers the answers from the provisioning wizard dialog box
     * 
     * The function that is run when a user clicks 'Submit' and passes answers to the wizard service
     */
    public HandleWizardResults(answers): void {
        this.wizardService.HandleAnswers(answers);
    }
}