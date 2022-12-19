import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
 
  constructor(private http: HttpClient) { }
  
  getBooks(searchTerm:string): Observable<any> {
    return this.http.get(`http://openlibrary.org/search.json?q=${searchTerm}`)
    .pipe(
      map((response: any) => {
        return response;
      }),
    );
  }
}
