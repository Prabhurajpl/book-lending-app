import { collection } from '@firebase/firestore';
import { addDoc, collectionChanges, doc, Firestore, getDocs } from '@angular/fire/firestore';
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
  constructor(private afs: AngularFirestore, private firestore: Firestore) {
    this.itemsCollection = afs.collection<any>('Library');
    this.liblist = this.itemsCollection.snapshotChanges();
  }



  addLibrary(item: any) {
    this.itemsCollection.add(item);
  }
  
  addbooktolib(libname:string,books:any) {
    this.afs.collection("Lib-collection").doc(libname).set({Books:books})
  }
  
  getLibcollections():Observable<any>{
    return this.liblist.pipe(
      map((libcollection: any[]) =>
      libcollection.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }))
      )
    )
  }

 getlibbookcollection(value?:string) :Observable<any> {
   return this.afs.collection('Lib-collection').snapshotChanges().pipe(
      map((libcollection: any[]) =>
      libcollection.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }))
      )
    )
  }

  addReqbookList(userEmail:string,books:any){
    this.afs.collection("Req-Book-collection").doc(userEmail).set({Books:books})
  }
  
  getExistingreqBookcol() :Observable<any> {
    return this.afs.collection('Req-Book-collection').snapshotChanges().pipe(
       map((bookcollection: any[]) =>
       bookcollection.map((item) => ({
           id: item.payload.doc.id,
           ...item.payload.doc.data(),
         }))
       )
     )
   }

   updatebookstatus(libname:string,):Observable<any>{
       return   this.afs.collection("Lib-collection").doc(libname).get();
   }
   
  
 
}
