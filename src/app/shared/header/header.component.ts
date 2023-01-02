import { BooksService } from 'src/app/Core/services/books.service';
import { UsersService } from './../../Core/services/users.service';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, BehaviorSubject, switchMap, Observable, first, take } from 'rxjs';

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
  booklistCount!: any;
  $subs! :Subscription;
  
  constructor(
    private router: Router,
    private userdataservice: UsersService,
    private bookservice: BooksService
  ) {}

  
  ngOnInit(): void {
    debugger
    this.userEmail = this.userdataservice.userEmail;
    this.routepathsubscr = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        if (this.currentUrl === '/Searchbooks') {
          this.islogin_or_register = true;
        }
      }
    });

   this.userdataservice.countofbooks.subscribe((issuedBook) =>{
      this.booklistCount = issuedBook
    })
   this.userdataservice.userId
   .subscribe((Firstname) =>{
      this.userEmail = Firstname
      console.log("Firstname",Firstname)
    })
   
  
  }
  ngOnDestroy(): void {
    this.routepathsubscr.unsubscribe();
  }
  Logout() {
    this.islogin_or_register = false;
    this.router.navigateByUrl('login');
  }

  getissuebooklist(userId:string) : Observable<any> {
    this.bookservice.getIssuedBooks(userId).subscribe({
      next: (resp) => {
         this.booklistCount = resp.length;
      },
    })
    return this.booklistCount
  }


}
