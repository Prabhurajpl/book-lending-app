import { FormsModule } from '@angular/forms';
import { LibraryAddComponent } from './library-add/library-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LibraryBookListComponent } from './library-book-list/library-book-list.component';


@NgModule({
  declarations: [
    LibraryAddComponent,
    LibraryComponent,
    LibraryBookListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    LibraryAddComponent,
  ]
  
})
export class LibraryModule { }
