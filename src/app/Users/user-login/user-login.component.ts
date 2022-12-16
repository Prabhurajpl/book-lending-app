import { UsersService } from './../../Core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loading = false;
  constructor(private userdataservice:UsersService) { }
  EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  UserLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(1), Validators.pattern(this.EMAIL_REGEXP)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5),]),
    
  })

  ngOnInit(): void {
    //this.userdataservice.getDbdata();
  }

  Loginsubmit(){
    debugger
    if (this.UserLoginForm.invalid) {
      return;
    }
    const { email: userEmail, password: userPassword } = Object.assign(this.UserLoginForm.value)
    //this.loading = true;

    this.userdataservice.getDbdata(userEmail,userPassword)
    .pipe(take(1))
    .subscribe((respdata:any)=>{
      console.log("respdata", respdata)
    })
  }

}
