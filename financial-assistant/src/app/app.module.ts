import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './components/template/body/body.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionTitleComponent } from './components/utils/section-title/section-title.component';
import { BottomNavigationBarComponent } from './components/template/bottom-navigation-bar/bottom-navigation-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HomePageComponent,
    SectionTitleComponent,
    BottomNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
