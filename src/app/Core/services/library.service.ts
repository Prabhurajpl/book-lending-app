import { collection } from '@firebase/firestore';
import { collectionChanges, doc, Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private itemsCollection!: AngularFirestoreCollection<any>;
  liblist!: Observable<any>;
  item$!:Observable<any>
  libCollections :any;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<any>('Library');
    this.liblist = this.itemsCollection.snapshotChanges();
  }
  addLibrary(item: any) {
    this.itemsCollection.add(item);
  }
  
  getLibcollections():Observable<any>{
    debugger
    return this.liblist.pipe(
      map((libcollection: any[]) =>
      libcollection.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }))
      )
      
    )
  }

 
}
