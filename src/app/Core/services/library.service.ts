import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private itemsCollection!: AngularFirestoreCollection<any>;
  liblist!: Observable<any>;
  
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('Library');
    this.liblist = this.itemsCollection.valueChanges();
  }
  addLibrary(item: any) {
    this.itemsCollection.add(item);
  }
  getLibcollection(){
    return this.liblist;
  }
 
}
