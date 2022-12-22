import { LibraryBooklistComponent } from './library-booklist/library-booklist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';

const routes: Routes = [
  {path:'booksearch',component:BookSearchComponent},
  //{path:'booklist',component:LibraryBooklistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
