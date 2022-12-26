import { BooksModule } from './../Books/books.module';
import { LibraryModule } from './../Library/library.module';
import { LibraryRoutingModule } from './../Library/library-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    BooksModule,
    LibraryModule,
  ],
  exports:[
    HeaderComponent,
  ]
  
 
  
})
export class SharedModule { }
