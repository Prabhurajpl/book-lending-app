import { UsersService } from './../../Core/services/users.service';
import { BooksService } from './../../Core/services/books.service';
import { LibraryService } from './../../Core/services/library.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss'],
})
export class MyBooksComponent implements OnInit {
  libdatsource!: any;
  myBooklist!: any;
  exisitingReqBookcol!: Array<any>;
  userEmail!: any;
  bookDataSource!: string[];
  bookArray: any[] = [];
  constructor(
    private libservice: LibraryService,
    private bookservice: BooksService,
    private userDataservice: UsersService
  ) {}

  ngOnInit(): void {
    this.libservice.getExistingreqBookcol().subscribe({
      next: (arg) => {
        this.bookArray = [];
        arg.docs.forEach((doc: any) => {
          this.bookArray.push({ id: doc.id, ...doc.data() });
        });
        console.log('books', this.bookArray);
        this.myBooklist = this.bookArray.find((item) => {return item.id === this.userDataservice.userEmail}).Books;
      },
    });
  }
  ReqApprove(Book: any) {
    let btn_Accept = <HTMLElement>document.getElementById(Book.isbn);
    if (btn_Accept.innerText != 'Return') {
      this.Updatedata_LibCollection(Book.library, Book.isbn);
      this.Updatedata_ReqCollection(Book.isbn,btn_Accept)
    }
    
  }

  Updatedata_LibCollection(lib: string, isbn: string) {
    this.libservice.getdocBookcollection().subscribe({
      next: (arg) => {
        this.bookArray = [];
        arg.docs.forEach((doc: any) => { this.bookArray.push({ id: doc.id, ...doc.data() })});
        console.log('books', this.bookArray);
        let Books = this.bookArray.find((item) => { return item.id === lib;}).Books;
        let selectedBook = [Books.find((book: any) => { return book.isbn === isbn;})];
        selectedBook.forEach((element: any) => {
          element.is_availabe = false;
        });
        this.libservice.addbooktolib(lib, Books);
      },
      error(err) {
          console.log(err)
      },
    });
  }


  Updatedata_ReqCollection(isbn: string,btnid:any) {
    const useremail = this.userDataservice.userEmail;
    let Books = this.bookArray.find((item) => {return item.id === useremail;}).Books;
        let selectedBook = [Books.find((book: any) => { return book.isbn === isbn })];
        selectedBook.forEach((element: any) => {
          element.is_availabe = false;
        });
        this.libservice.addReqbookList(useremail, Books);
        btnid.innerText = 'Return';
  }
   
 






}
