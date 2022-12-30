import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/Core/services/library.service';

@Component({
  selector: 'library-book-view',
  templateUrl: './library-book-view.component.html',
  styleUrls: ['./library-book-view.component.scss'],
})
export class LibraryBookViewComponent implements OnInit {

  bookDataSource!: any;
  constructor(private libservice: LibraryService,private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.getLibrarybooks(params['name']);
    })
  }
  getLibrarybooks(selectedLibrary: string) {
    this.libservice.getLibraryBooks(selectedLibrary).subscribe((respData)=>{
       this.bookDataSource = respData;
    })
  }
}
