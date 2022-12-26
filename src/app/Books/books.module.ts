import { SharedModule } from './../shared/shared.module';
import { LibraryModule } from './../Library/library.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookSearchComponent } from './book-search/book-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MyBooksComponent } from './my-books/my-books.component';



@NgModule({
  declarations: [
    BookSearchComponent,
    PaginationComponent,
    MyBooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    LibraryModule
  ],
  exports:[
    BookSearchComponent,
    PaginationComponent,
  ]
})
export class BooksModule { }
