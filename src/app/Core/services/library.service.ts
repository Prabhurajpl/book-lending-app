import { Firestore} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable,Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private itemsCollection!: AngularFirestoreCollection<any>;

  liblist!: Observable<any>;
  item$!:Observable<any>
  libCollections :any;
  libraryView = new Subject<any>();
  collection$ = new Subject<any>();

  constructor(private db: AngularFirestore, private firestore: Firestore) {
    this.itemsCollection = db.collection<any>('Library');
    this.liblist = this.itemsCollection.snapshotChanges();
  }

  addLibrary(item: any) {
    this.itemsCollection.add(item);
  } 

  getLibraryBooks(selectedLibrary:string) :Observable<any>{
    return this.db.collectionGroup('Books', ref => ref.where('library', '==', selectedLibrary))
    .snapshotChanges()
    .pipe(
     map((libcollection: any[]) =>
      libcollection.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data(),
        }))
      )
    )
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

}
