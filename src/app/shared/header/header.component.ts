import { UsersService } from './../../Core/services/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'booklending-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  islogin_or_register: boolean = false;
  routepathsubscr!: Subscription;
  currentUrl: string = ""; 
  userEmail:string="";

  constructor(private router: Router,private userdataservice:UsersService) { }

  ngOnInit(): void {
   this.routepathsubscr= this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log("url",this.currentUrl)
        if(this.currentUrl ==='/library'){
          this.islogin_or_register = true;

        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routepathsubscr.unsubscribe();
  }
  Logout(){
    this.islogin_or_register = false;
    this.router.navigateByUrl('login');
  }
}
