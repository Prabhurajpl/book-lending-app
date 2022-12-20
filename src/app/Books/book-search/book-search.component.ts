import { BooksService } from './../../Core/services/books.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { LibraryService } from 'src/app/Core/services/library.service';
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
  libLists!:any;
  constructor(private bookservice:BooksService,private libservice:LibraryService) {
  }

  ngOnInit(): void {
    this.libservice.getLibcollection().subscribe(data =>{
      this.libLists = data;
      console.log("data",data)
     })

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

  addtoLibrary(isbn:string){


  }
}

const enum pagedetails{
  postperpage =12,
  curentpage = 1,
}