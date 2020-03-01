import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user.model';

import * as userReducer from '../../state/user.reducer';
import * as userActions from '../../state/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  roles = [
    "User",
    "Admin"
  ];
  role: string;
  
  constructor(private store: Store<userReducer.UserState>) { }

  ngOnInit() {
    this.initializeForm();
  }
  private initializeForm() {
    const name = '';
    const email = '';
    const password = '';
    const role = null;
    this.registrationForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(8)]),
      'role': new FormControl(role, [Validators.required, Validators.min(0), Validators.max(1)])
    });
  }

  register() {
    this.registrationForm.get('role').patchValue(Number(this.registrationForm.get('role').value));
    this.store.dispatch(new userActions.CreateUser(this.registrationForm.value))
  }

}
