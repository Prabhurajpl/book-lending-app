import { FormsModule } from '@angular/forms';
import { BooksModule } from './../Books/books.module';
import { LibraryAddComponent } from './library-add/library-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';


@NgModule({
  declarations: [
    LibraryAddComponent,
    LibraryComponent,
    
  ],
  imports: [
    CommonModule,
    BooksModule,
    FormsModule
  ],
  
})
export class LibraryModule { }
