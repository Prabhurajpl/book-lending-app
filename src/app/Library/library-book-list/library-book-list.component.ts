import { BooksService } from './../../Core/services/books.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LibraryService } from 'src/app/Core/services/library.service';
import { BookDetails } from 'src/app/shared/interfaces/book-details';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Core/services/users.service';

@Component({
  selector: 'library-book-list',
  templateUrl: './library-book-list.component.html',
  styleUrls: ['./library-book-list.component.scss'],
})
export class LibraryBookListComponent implements OnInit {
  
  bookDataSource: any[] = [];
  filteredBooklist: any[] = [];
  searchTerm: string = '';
  existbooklist!: any;
  isRequestbook = false;
  booktitle: string = '';
  rentalDuration!: any;
  selectedBook!: any;
  bookRequestedBy : string ="";

  constructor(
    private libraryservice: LibraryService,
    private bookservice:BooksService,
    private userdataservice:UsersService
  ) {}

  ngOnInit(): void {
    this.bookservice.getALLBooks().subscribe((data) => {
      this.bookDataSource = data;
      this.filteredBooklist = this.bookDataSource;
      this.existbooklist = this.filteredBooklist;
    });
  }
  searchBookList() {
    if (!this.searchTerm || this.searchTerm.length < 3) {
      this.filteredBooklist = this.existbooklist;
      return;
    }
    if (this.filteredBooklist) {
      this.filteredBooklist = this.filteredBooklist.filter((item) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  requestBook(book: BookDetails) {
     this.selectedBook = book;
     this.booktitle = book.title;
     this.isRequestbook = true; 
     
  }
  closeRequstPopup() {
    this.isRequestbook = false;
  }

  sendBookRequest() {
    let bookId ;
    this.bookRequestedBy = this.userdataservice.userEmail;
    this.bookservice.getSelectedBook(this.selectedBook.isbn).subscribe( (resp:any) =>{
      bookId =resp.docs[0].id;
      this.bookservice.updateDocs(this.selectedBook.library,bookId,this.bookRequestedBy,this.selectedBook.book_addedBy)
      .then((resp)=>{
        this.isRequestbook = false; 
        alert("Request has been sent to " + this.selectedBook.book_addedBy)
      })
    })
  }


}
