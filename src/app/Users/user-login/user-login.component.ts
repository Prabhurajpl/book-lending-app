import { BooksService } from './../../Core/services/books.service';
import { UsersService } from './../../Core/services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, subscribeOn, take, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit,OnDestroy {
  loading = false;
  setCount! :number ;
  sub$ !:Subscription
  constructor(private userdataservice: UsersService, private _router: Router ,private bookservice : BooksService) {}
 
 
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

  ngOnInit(): void {
    

  }
  
  Loginsubmit() {
    if (this.UserLoginForm.invalid) {
      return;
    }
    
    this.userdataservice.Login(this.UserLoginForm.value)
    // .then(()=>{
    //   this.userdataservice.userEmail.next()
    // })
    // this.sub$=this.bookservice.getIssuedBooks(userEmail).subscribe((resp) =>{
    //         console.log("resp",resp)
    //         this.userdataservice.changeCountofBook(resp.length)
    //      })
    
  }
  ngOnDestroy(): void {
    // this.sub$.unsubscribe();
  }

}
