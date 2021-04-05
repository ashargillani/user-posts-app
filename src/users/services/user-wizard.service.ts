import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserWizardService {
  private workFlow = [
    {step: 'personal', valid: false},
    {step: 'address', valid: false},
    {step: 'summary', valid: false}
  ];

  validateStep(step: string): void {
    // If the state is found, set the valid field to true
    let found = false;
    for (let i = 0; i < this.workFlow.length && !found; i++) {
      if (this.workFlow[i].step === step) {
        found = this.workFlow[i].valid = true;
      }
    }
  }

  resetSteps(): void {
    // Reset all the steps in the Workflow to be invalid
    this.workFlow.forEach(element => {
      element.valid = false;
    });
  }

  getFirstInvalidStep(step: string): string {
    // If all the previous steps are validated, return blank
    // Otherwise, return the first invalid step
    let found = false;
    let valid = true;
    let redirectToStep = '';
    for (let i = 0; i < this.workFlow.length && !found && valid; i++) {
      const item = this.workFlow[i];
      if (item.step === step) {
        found = true;
        redirectToStep = '';
      } else {
        valid = item.valid;
        redirectToStep = item.step;
      }
    }
    return redirectToStep;
  }
}
