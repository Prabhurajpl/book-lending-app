import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/Core/services/library.service';

@Component({
  selector: 'library-book-view',
  templateUrl: './library-book-view.component.html',
  styleUrls: ['./library-book-view.component.scss'],
})
export class LibraryBookViewComponent implements OnInit, OnChanges {
  allLibrary!: any;
  bookDataSource!: any;
  @Input() selectedLib!: string;
  constructor(private libservice: LibraryService,private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.getLibrarybooks(params['name']);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getLibrarybooks(this.selectedLib);
  }

  getLibrarybooks(libid: string) {
    this.libservice.getlibbookcollection().subscribe((data) => {
      this.allLibrary = data;
      let books = this.allLibrary.find((item: any) => {
        return item.id === libid;
      });
      if (books != undefined) {
        this.bookDataSource = this.allLibrary.find((item: any) => {
          return item.id === libid;
        }).Books;
      } else {
        this.bookDataSource = [];
      }
    });
  }
}
