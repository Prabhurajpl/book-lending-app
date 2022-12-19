import { Library } from './../../shared/interfaces/library';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  liblist!: Observable<any>;
  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    public _angularFireAuth: AngularFireAuth
  
  ) { 
  }

  addLibrary(value: any) {
    const dbInstance = collection(this.firestore, 'Library');
    addDoc(dbInstance, value)
      .then(() => {})
      .catch((err) => {
        alert(err.message);
      });
  }
  
 
}
