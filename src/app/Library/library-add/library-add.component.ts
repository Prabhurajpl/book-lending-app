import { LibraryService } from './../../Core/services/library.service';
import { Library } from './../../shared/interfaces/library';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'library-add',
  templateUrl: './library-add.component.html',
  styleUrls: ['./library-add.component.scss']
})
export class LibraryAddComponent implements OnInit {

  librarylist : any=[];
  constructor(private Library:LibraryService) { }

  ngOnInit(): void {
    
  }
  onEnter(event:any){
    let lib : Library = {
      libname:event.target.value
    }
    //this.Library.addLibrary(lib)
    this.librarylist.push(lib)
  }

}
