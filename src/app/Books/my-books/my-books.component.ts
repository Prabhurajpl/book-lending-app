import { UsersService } from './../../Core/services/users.service';
import { BooksService } from './../../Core/services/books.service';
import { LibraryService } from './../../Core/services/library.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
 

  libdatsource !: any;
  myBooklist!: any;
  exisitingReqBookcol!: Array<any>
  userEmail!: any;
  bookDataSource !: string[];
  constructor(private libservice: LibraryService,private bookservice:BooksService,private userDataservice : UsersService) { }
  

  ngOnInit(): void {
    this.libservice.getExistingreqBookcol().subscribe((data) => {
      this.exisitingReqBookcol = data;
      this.userEmail = this.userDataservice.userEmail;
      this.myBooklist = this.exisitingReqBookcol.find((item: any) => { return item.id === this.userEmail })['Books']
    })

  }
  ReqAccept(Book: any) {

    let booklist :any[]=[];
    this.bookservice.getExistbooklist().subscribe((data) => {
      this.libdatsource = data;
      let existlib = this.libdatsource?.find((item: any) => {
        return item.id === "Lib5";
      });
      if (typeof existlib != 'undefined' && existlib['Books']) {
        existlib.Books.find((item: any) => { return item.isbn === Book.isbn }).is_availabe = false
        booklist = existlib.Books;
      }
      this.libservice.addbooktolib("Lib5", booklist);

    });

  }

}
