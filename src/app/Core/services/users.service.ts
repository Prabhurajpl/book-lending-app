import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection } from '@firebase/firestore'



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userEmail :string=""
  userData: any;
  useExist: boolean = false;
  isLoginedUser=false;
  constructor(private http: HttpClient, 
              private firestore: Firestore, 
              public _angularFireAuth: AngularFireAuth,
              private router:Router) { }

            

  SignUp(formvalues:any) {
    const { email: userEmail, password: userPassword } = Object.assign(formvalues)
    return this._angularFireAuth
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then((result) => {
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
      })
      .catch( (err) =>{
        alert(err.message)
      });
  }


  addUserdata(value: any) {
    const dbInstance = collection(this.firestore, 'Users')
    addDoc(dbInstance, value).then(() => {
      this.SendVerificationMail();
    })
      .catch((err) => {
        alert(err.message)
      })

  }
  
   Login(formvalues:any) {
      const { email: userEmail, password: userPassword } = Object.assign(formvalues)
      return this._angularFireAuth
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then((resp) => {
          if (resp.user?.emailVerified !== true) {
            window.alert(
              'Please validate your email address. Kindly check your inbox.'
            );
          } else {
          this._angularFireAuth.authState.subscribe((user) => {
            if (user) {
              this.userEmail=userEmail;
              this.isLoginedUser =true;
              this.router.navigateByUrl('Searchbooks')
            }
          })}
        
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
    

    
}
