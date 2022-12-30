import { IssueBookComponent } from './issue-book/issue-book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookSearchComponent } from './book-search/book-search.component';
import { AuthGuardGuard } from '../Guards/auth-guard.guard';

const routes: Routes = [
  { 
    path: 'Searchbooks', 
    component: BookSearchComponent ,
    canActivate:[AuthGuardGuard],
  },
  { 
    path: 'mybooks', 
    component: MyBooksComponent,
    canActivate:[AuthGuardGuard],
  },
  { 
    path: 'issuebooks', 
    component: IssueBookComponent,
    canActivate:[AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
