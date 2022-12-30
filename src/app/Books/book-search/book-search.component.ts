import { UsersService } from 'src/app/Core/services/users.service';
import { BookDetails } from './../../shared/interfaces/book-details';
import { BooksService } from './../../Core/services/books.service';
import { Component, OnInit } from '@angular/core';
import { finalize, map, Subject } from 'rxjs';
import { LibraryService } from 'src/app/Core/services/library.service';
import { Firestore} from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  islistlib = false;
  allLibrary!: any;
  selectedbook!: string;
  selectedLib!: string;
  bookcollection!: any;
  booklist!: any;
  bookArray: any[] = [];
  constructor(
    private bookservice: BooksService,
    private libservice: LibraryService,
    private userservice: UsersService,
    public afsdb: AngularFirestore,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

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

    //const dbRef = doc(this.firestore, 'Lib-collection',);

    // this.libservice.updatdoc().subscribe(resp =>{
    //   console.log("firestoredata",resp)
    //   const bookId =resp[0].id;
    //   this.afsdb.doc(`LibGroup/Lib1/Books/${bookId}`).update({is_availabe:false});
    // })
    

    // this.libservice.getlibbookcollection().subscribe(resp=>{
    //   console.log("alldata",resp)
    // })
    


  }

  setPagination(selectedpage: number) {
    let indexofLastpage = selectedpage * pagedetails.postperpage;
    let indexofFirstpage = indexofLastpage - pagedetails.postperpage;
    this.bookDataSource = this.allBooksList?.slice(
      indexofFirstpage,
      indexofLastpage
    );
  }

  addBooktoLibrary(selectedbook: any) {
    this.getliblist(selectedbook);
  }

  getliblist(selectedbook: any) {
    this.libservice.getLibcollections().subscribe((data) => {
      this.allLibrary = data;
      this.islistlib = true;
      this.selectedBookdetails = [];
      this.selectedBookdetails.push({
	          title:selectedbook?.title,
	          publish_date : selectedbook?.publish_date[0],
	          author_name:selectedbook?.author_name[0],
	          isbn: selectedbook.isbn[0],
	          status:'Available',
	          book_addedBy:this.userservice.userEmail
      });
    });
  }
  closepopup() {
    this.islistlib = false;
  }
  saveBooktoLib() {
    this.selectedBookdetails?.forEach((element)=>{
       element.library = this.selectedLib;
    })
    this.bookservice.addBook(this.selectedLib, this.selectedBookdetails[0]).subscribe((resp:any) =>{
       window.alert("Books added to :" + this.selectedLib)
       this.selectedLib="";
       this.islistlib = false;
      }
    );
  }


}

const enum pagedetails {
  postperpage = 12,
  curentpage = 1,
}
