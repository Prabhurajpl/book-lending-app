import { BooksService } from 'src/app/Core/services/books.service';
import { LibraryService } from 'src/app/Core/services/library.service';
import { UsersService } from './../../Core/services/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'booklending-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  islogin_or_register: boolean = false;
  routepathsubscr!: Subscription;
  currentUrl: string = '';
  userEmail: string = '';
  bookArray: any[] = [];
  myBooklist!: any;
  booklistCount!: number;

  constructor(
    private router: Router,
    private userdataservice: UsersService,
    private bookservice: BooksService
  ) {}

  ngOnInit(): void {
    this.userEmail = this.userdataservice.userEmail;
    this.routepathsubscr = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('url', this.currentUrl);
        if (this.currentUrl === '/Searchbooks') {
          this.islogin_or_register = true;
          this.getissuebooklist(this.userdataservice.userEmail);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routepathsubscr.unsubscribe();
  }
  Logout() {
    this.islogin_or_register = false;
    this.router.navigateByUrl('login');
  }

  getissuebooklist(userId:string) {
    this.bookservice.getIssuedBooks(userId).subscribe({
      next: (resp) => {
        this.booklistCount = resp.length;
      },
    });
  }
}
