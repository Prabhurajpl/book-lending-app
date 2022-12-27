import { LibraryBookViewComponent } from './library-book-view/library-book-view.component';
import { LibraryComponent } from './library.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'library',component:LibraryComponent},
  //{path:'addlibrary',component:LibraryAddComponent}
  {path:'library-view/:name',component:LibraryBookViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
