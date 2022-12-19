import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BookSearchComponent } from './book-search/book-search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RequestPopupComponent } from './request-popup/request-popup.component';


@NgModule({
  declarations: [
    BookSearchComponent,
    PaginationComponent,
    RequestPopupComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule
  ],
  exports:[
    BookSearchComponent,
    PaginationComponent,
  ]
})
export class BooksModule { }
