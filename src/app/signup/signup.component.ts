import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormHelperService } from '../services/form-helper.service';
import { UserSignupService } from '../services/user-signup.service';
import { Signup } from '../Models/Signup';
import { User } from '../Models/User';

@Component({
  selector: 'acme-app-root',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm;

  constructor(private formBuilder: FormBuilder, private formHelperService: FormHelperService, private signupService: UserSignupService) { 
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activity: ['', Validators.required],
      comments: ''
    });
  }

  ngOnInit() {    
    let validationMessages = {
      fname: {
        required: 'First name is required'
      },
      lname: {
        required: 'Last name is required'
      },
      email: {
        required: 'Email is required',
        email: 'It is not an email'
      },
      activity: {
        required: 'Activity is required'
      }
    };
    this.formHelperService.initialize(this.signupForm, validationMessages);
  }

  onSubmit() {
    this.formHelperService.validateBeforeSubmit(this.signupForm);
    if (this.signupForm.valid) {
      let signup: Signup = new Signup({
        User: new User({
          FirstName: this.signupForm.value.fname,
          LastName: this.signupForm.value.lname,
          Email: this.signupForm.value.email,
        }),
        Activity: this.signupForm.value.activity,
        Comments: this.signupForm.value.comments
      })
      this.signupService.createSignup('Signup/Create', signup)
    }
  }
}
