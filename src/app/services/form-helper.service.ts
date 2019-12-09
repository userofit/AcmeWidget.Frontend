import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable()
export class FormHelperService {
  form: FormGroup;
  validationMessages: {
    [field: string]: {
      [error: string]: string
    }
  };

  initialize(
    form?: FormGroup,
    validationMessages?: {
      [field: string]: {
        [error: string]: string
      }
    }
  ): void {
    this.form = form;
    this.validationMessages = validationMessages;
  }

  hasError(key: string, validation?: string): boolean {
    const control = this.form.get(key);
    if (control) {
      return control.touched && control.invalid && (!!validation ? control.hasError(validation) : true);
    }
    return false;
  }

  getErrors(key: string): Array<string> {
    const control = this.form.get(key);
    if (control) {
      return Object.keys(control.errors).filter((validation: string) => {
        return control.errors[validation];
      });
    }
    return [];
  }

  getErrorMessage(field: string, error: string): string {
    return this.validationMessages[field][error];
  }

  validateBeforeSubmit(form?: FormGroup): void {
    const formGroup = !!form ? form : this.form;
    if (formGroup.controls) {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        if (control instanceof FormGroup) {
          this.validateBeforeSubmit(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach((field: FormGroup) => {
            this.validateBeforeSubmit(field);
          });
        }

        control.updateValueAndValidity();
        control.markAsTouched();
      });
    }
  }
}
