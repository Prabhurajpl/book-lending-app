import { HeaderComponent } from './header/header.component';
import { LibraryRoutingModule } from './../Library/library-routing.module';
import { LibraryModule } from './../Library/library.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LibraryRoutingModule,
    LibraryModule
  ],
  exports:[
    HeaderComponent
  ]
  
})
export class SharedModule { }
