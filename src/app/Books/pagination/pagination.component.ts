import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit,OnChanges {

  @Input() postperPage! : number;
  @Input() totalPosts!:number;
  @Input() curentpage!:number | undefined;
  @Output() changepagenmuber:EventEmitter<number> = new EventEmitter<number>();
  pageNumbers:any;
  constructor() { }
  
  ngOnInit(): void {
    console.log("postperpage",this.postperPage)
  }
   
  Pagination = () => {
       this.pageNumbers =[];
       for(let i = 1; i<= Math.ceil(this.totalPosts/ this.postperPage); i++) {
          this.pageNumbers.push(i);
       }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.Pagination();
    this.curentpage = 1;

  }
  changepage(page: number | undefined){
    this.curentpage = page;
    this.changepagenmuber.emit(page)
  }


}
