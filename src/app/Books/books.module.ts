import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { BookSearchComponent } from './book-search/book-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LibraryBooklistComponent } from './library-booklist/library-booklist.component';



@NgModule({
  declarations: [
    BookSearchComponent,
    PaginationComponent,
    LibraryBooklistComponent,
    
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ],
  exports:[
    BookSearchComponent,
    PaginationComponent,
    LibraryBooklistComponent
  ]
})
export class BooksModule { }
