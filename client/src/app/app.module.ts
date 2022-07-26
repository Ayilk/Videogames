import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsModule } from './cards/cards.module';
import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { LandingPageModule } from './landing-page/landing-page.module';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    NavbarModule,
    CardsModule, 
    LandingPageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
