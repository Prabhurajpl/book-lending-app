import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit,OnChanges {

  isEnablebooklist:boolean=false;
  count: string = "false";
  ishowListbook =false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    
    this.count;
  }

  ngOnInit(): void {
    
      // if(this.count ==="true"){
      //   this.ishowListbook=true;
      // }
  }

}
