import { UsersService } from './../../Core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  loading = false;
  constructor(private userdataservice: UsersService, private _router: Router) {}
  EMAIL_REGEXP =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  UserLoginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(1),
      Validators.pattern(this.EMAIL_REGEXP),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  ngOnInit(): void {}
  
  Loginsubmit() {
    debugger;
    if (this.UserLoginForm.invalid) {
      return;
    }
    this.userdataservice.Login(this.UserLoginForm.value);
  }
}
