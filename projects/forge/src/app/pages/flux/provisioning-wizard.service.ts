import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable()
export class ProvisioningWizardService {
    /**
     * The subject with the user's answers to the provisioning wizard
     */
    submitClicked = new Subject();

    /**
     * 
     * @param answers the user's answers to the provisioning wizard
     * 
     * Emits user's answers to the provisioning wizard
     */
    public HandleAnswers(answers) {
        this.submitClicked.next(answers);
    }
}