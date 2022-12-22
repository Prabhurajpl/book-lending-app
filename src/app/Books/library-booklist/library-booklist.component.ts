import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'library-booklist',
  templateUrl: './library-booklist.component.html',
  styleUrls: ['./library-booklist.component.scss']
})
export class LibraryBooklistComponent implements OnInit {
  
  bookDataSource! :[];
  constructor() { }

  ngOnInit(): void {
  }

}
