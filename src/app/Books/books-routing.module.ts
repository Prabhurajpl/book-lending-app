import { MyBooksComponent } from './my-books/my-books.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';

const routes: Routes = [
  {path:'Searchbooks',component:BookSearchComponent},
  {path:'mybooks',component:MyBooksComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
