import { FormsModule } from '@angular/forms';
import { LibraryAddComponent } from './library-add/library-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LibraryBookListComponent } from './library-book-list/library-book-list.component';
import { LibraryBookViewComponent } from './library-book-view/library-book-view.component';


@NgModule({
  declarations: [
    LibraryAddComponent,
    LibraryComponent,
    LibraryBookListComponent,
    LibraryBookViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    LibraryAddComponent,
    LibraryBookViewComponent
  ]
  
})
export class LibraryModule { }
