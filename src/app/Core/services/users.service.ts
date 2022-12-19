import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, doc, Firestore, getDoc, getDocs, } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection } from '@firebase/firestore'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userData: any;
  useExist: boolean = false;
  constructor(private http: HttpClient, 
              private firestore: Firestore, 
              public _angularFireAuth: AngularFireAuth,
              private router:Router) { }



  SignUp(formvalues:any) {
    const { email: userEmail, password: userPassword } = Object.assign(formvalues)
    return this._angularFireAuth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((result) => {
        this.SendVerificationMail();
        this.addUserdata(formvalues);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  
   SendVerificationMail() {
    return this._angularFireAuth.currentUser
      .then((user: any) => user.sendEmailVerification())
      .then(() => {
        this.router.navigateByUrl('verify-email');
      });
  }


  addUserdata(value: any) {
    debugger
    const dbInstance = collection(this.firestore, 'Users')
    addDoc(dbInstance, value).then(() => {
     
    })
      .catch((err) => {
        alert(err.message)
      })

  }
  
   Login(formvalues:any) {
      const { email: userEmail, password: userPassword } = Object.assign(formvalues)
      return this._angularFireAuth
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then((result) => {
          this._angularFireAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigateByUrl('library')
            }
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
}
