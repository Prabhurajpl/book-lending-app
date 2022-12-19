import { BooksService } from './../../Core/services/books.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchTerm : string ="";
  bookDataSource! :any;
  allBooksList!:any;
  isLoading=false;
  postperPage =pagedetails.postperpage;
  curentpage =pagedetails.curentpage;
  totalPosts!:number;
  constructor(private bookservice:BooksService) { 
   

  }

  ngOnInit(): void {

  }

  search() {
    this.isLoading = true;
    this.bookservice.getBooks(this.searchTerm).pipe(
     finalize(()=>{
      this.isLoading = false;
     })
    )
    .subscribe(response => {
      this.allBooksList = response.docs;
      this.totalPosts = this.allBooksList.length
      this.setPagination(this.curentpage)
    })
  }

  setPagination(selectedpage:number){
    let indexofLastpage = selectedpage * pagedetails.postperpage;
    let indexofFirstpage =  indexofLastpage - pagedetails.postperpage;
    this.bookDataSource = this.allBooksList?.slice(indexofFirstpage, indexofLastpage)
    console.log("books",this.bookDataSource)
  }
}

const enum pagedetails{
  postperpage =10,
  curentpage = 1,
}