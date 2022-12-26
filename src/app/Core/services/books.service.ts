import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 
  filteredBooklist!:any;
  constructor(private http: HttpClient,private afs: AngularFirestore) { }
  
  getBooks(searchTerm:string): Observable<any> {
    return this.http.get(`http://openlibrary.org/search.json?q=${searchTerm}`)
    .pipe(
      map((response: any) => {
        return response;
      }),
    );
  }
  
  getExistbooklist() :Observable<any> {
    return this.afs.collection('Lib-collection').snapshotChanges().pipe(
       map((libcollection: any[]) =>
       libcollection.map((item) => ({
           id: item.payload.doc.id,
           ...item.payload.doc.data(),
         }))
       )
     )
   }

   getAllbooks(dataSource:any) {
    this.filteredBooklist =[];
      for (let i = 0; i < dataSource.length; i++) {
        let selcetedbook = [dataSource[i]];
        for (let j = 0; j < selcetedbook[0].Books.length; j++) {
          this.filteredBooklist.push(selcetedbook[0].Books[j]);
        }
      }
      return this.filteredBooklist;
     
    }



}
