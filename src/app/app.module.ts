import { SharedModule } from './shared/shared.module';
import { UserModule } from './Users/user.module';
import { UserRoutingModule } from './Users/user-routing.module';
import { firebaseConfig } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserRoutingModule,
    UserModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(firebaseConfig),
    SharedModule,
    AppRoutingModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
