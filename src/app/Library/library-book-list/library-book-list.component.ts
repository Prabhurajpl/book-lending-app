import { BooksService } from './../../Core/services/books.service';
import { ReqBookDetails } from './../../shared/interfaces/book-details';
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
  searchlist!: Array<BookDetails>;
  reqBooklist: Array<ReqBookDetails> = [];
  searchTerm: string = '';
  existbooklist!: any;
  isRequestbook = false;
  booktitle: string = '';
  rentalDuration!: any;
  errorMsg: string = '';
  exisitingReqBookcol!: any;
  userEmail!: any;
  selectedBook!: any;
  bookOwnerId: string = '';

  constructor(
    private libservice: LibraryService,
    private userDataservice: UsersService,
    private bookservice:BooksService
  ) {}

  ngOnInit(): void {
    this.libservice.getlibbookcollection().subscribe((data) => {
      this.bookDataSource = data;
      this.filteredBooklist = this.bookservice.getAllbooks(this.bookDataSource);
    });
  }

  getExisting_reqBookcol() {
    this.libservice.getExistingreqBookcol().subscribe((data) => {
      this.exisitingReqBookcol = data;
    });
  }
  search_book() {
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

  RequestBook(book: BookDetails) {
    this.getExisting_reqBookcol();
    this.selectedBook = book;
    this.isRequestbook = true;
    this.booktitle = book.title;
    this.bookOwnerId = book.book_addedBy;
    console.log(book);
  }
  close_requstbook() {
    this.isRequestbook = false;
  }

  send_request() {
    // let dur = parseFloat(this.rentalDuration);
    // if(!dur || !(!isNaN(this.rentalDuration) && (dur | 0) === dur)){
    // 	this.errorMsg = "Error: Rent Duration has to be a number";
    // 	return;
    // }
    this.getExisting_reqBookcol();
    let retDate = new Date();
    retDate.setDate(retDate.getDate() + +this.rentalDuration);
    console.log(retDate);
    //this.userEmail = 'prabhurajpl66@gmail.com';
    this.userEmail = this.userDataservice.userEmail;
    this.rentalDuration;
    this.booktitle;

    this.reqBooklist.push({
      useremail: this.userEmail,
      title: this.selectedBook.title,
      publish_date: this.selectedBook.publish_date,
      author_name: this.selectedBook.author_name,
      isbn: this.selectedBook.isbn,
      is_availabe: this.selectedBook.is_availabe,
      rent_duration: this.rentalDuration,
      return_date: retDate,
    });
    this.saveReqBookcollection(this.userEmail);
  }

  saveReqBookcollection(email: string) {
    let booklist = [];
    let existbookcol = this.exisitingReqBookcol?.find((item: any) => {
      return item.id === email;
    });
    if (typeof existbookcol != 'undefined' && existbookcol['Books']) {
      existbookcol.Books.push(this.reqBooklist[0]);
      booklist = existbookcol.Books;
    } else {
      booklist = [...this.reqBooklist];
    }
    this.libservice.addReqbookList(email, booklist);
    this.isRequestbook = false;
    alert('Request sent to' + this.bookOwnerId);
  }
}
