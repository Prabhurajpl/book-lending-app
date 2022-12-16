import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, doc, Firestore, getDoc, getDocs } from '@angular/fire/firestore'
import { collection } from '@firebase/firestore'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userData: any;
  useExist: boolean = false;
  constructor(private http: HttpClient, private firestore: Firestore) { }

  addUserdata(value: any) {
    const dbInstance = collection(this.firestore, 'Users')
    addDoc(dbInstance, value).then(() => {
      alert('User has been registered')
    })
      .catch((err) => {
        alert(err.message)
      })

  }

  getDbdata(userEmail: string,userPassword: string): Observable<any[]> {
    debugger
    const dbInstance = collection(this.firestore, 'Users')
    getDocs(dbInstance)
      .then((data) => {
        this.userData = [...data.docs.map((item) => {
          console.log("item", item)
          return { ...item.data() }
        })]
      })
    let currentUser = this.userData.find((item: { email: string; password: string }) => 
                               { return item.email === userEmail && item.password === userPassword })
    return of(currentUser);
  }


}
