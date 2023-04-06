import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AppComponent } from './app.component';

// Problem with Firebase Configuration
// import { AngularFireModule } from "@angular/fire/compat";
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GamePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
