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
  selectedLib ! :string ;
  name! :string;
  constructor(private libservice:LibraryService) { }


  ngOnInit(): void {
    this.getAllLibrary();
  }
  onEnter(){
    let lib : Library = {
      libname:this.name
    }
    this.libservice.addLibrary(lib)
    this.getAllLibrary();
    this.name ="";
  }

  getAllLibrary(){
    this.libservice.getLibcollection().subscribe(data =>{
      this.librarylist = data;
      console.log("data",data)
     })
  }
  librayClick(event:any){
    this.selectedLib = event.target.text;
  }

}
