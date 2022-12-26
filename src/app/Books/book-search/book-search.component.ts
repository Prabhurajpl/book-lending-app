import { UsersService } from 'src/app/Core/services/users.service';
import { BookDetails } from './../../shared/interfaces/book-details';
import { BooksService } from './../../Core/services/books.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { LibraryService } from 'src/app/Core/services/library.service';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  searchTerm: string = '';
  selectedBookdetails!: Array<BookDetails>;

  bookDataSource!: any;
  allBooksList!: any;
  isLoading = false;
  postperPage = pagedetails.postperpage;
  curentpage = pagedetails.curentpage;
  totalPosts!: number;
  libLists!: any;
  islistlib = false;
  isLibararyselected = false;
  allLibrary!: any;
  selectedbook!: any;
  selectedLib!: any;
  bookcollection!: any;

  constructor(
    private bookservice: BooksService,
    private libservice: LibraryService,
    private userservice: UsersService
  ) {}

  ngOnInit(): void {
    this.libservice.getlibbookcollection(this.selectedLib).subscribe((data) => {
      this.bookcollection =[];
      this.bookcollection = data;
    });
  }

  search() {
    this.isLoading = true;
    this.bookservice
      .getBooks(this.searchTerm)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.allBooksList = response.docs;
        this.totalPosts = this.allBooksList.length;
        this.setPagination(this.curentpage);
      });
  }

  setPagination(selectedpage: number) {
    let indexofLastpage = selectedpage * pagedetails.postperpage;
    let indexofFirstpage = indexofLastpage - pagedetails.postperpage;
    this.bookDataSource = this.allBooksList?.slice(
      indexofFirstpage,
      indexofLastpage
    );
    console.log('books', this.bookDataSource);
  }

  addBooktoLibrary(selectedbook: any) {
    this.islistlib = true;
    // this.selectedbook = selectedbook.isbn[0];
    this.selectedBookdetails =[];
    this.selectedBookdetails.push({
           title: selectedbook?.title,
           publish_date:selectedbook?.publish_date[0],
	         author_name:selectedbook?.author_name[0],
	         isbn: selectedbook.isbn[0],
           is_availabe:true,
           book_addedBy:this.userservice.userEmail,
    })
    this.getliblist();
  }
  getliblist() {
    this.libservice.getLibcollections().subscribe((data) => {
      this.allLibrary = data;
    });
  }
  closepopup() {
    this.islistlib = false;
  }
  saveBooktoLib() {
    let booklist = [];
    let existlib = this.bookcollection?.find((item: any) => {
      return item.id === this.selectedLib;
    });
    if (typeof existlib != 'undefined' && existlib['Books'] ) {
       existlib.Books.push(this.selectedBookdetails[0])
       booklist = existlib.Books;
    } else {
       booklist =[...this.selectedBookdetails]
    }

    this.libservice.addbooktolib(this.selectedLib, booklist);
    this.islistlib = false;
    alert("Books added to"+ this.selectedLib );
  }
}

const enum pagedetails {
  postperpage = 12,
  curentpage = 1,
}
