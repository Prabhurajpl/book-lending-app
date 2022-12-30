import { AuthGuardGuard } from './../Guards/auth-guard.guard';
import { LibraryBookViewComponent } from './library-book-view/library-book-view.component';
import { LibraryComponent } from './library.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'library',
    component:LibraryComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:'library-view/:name',
    component:LibraryBookViewComponent,
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
