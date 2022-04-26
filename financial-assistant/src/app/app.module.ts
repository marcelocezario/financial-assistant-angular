import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './components/template/body/body.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionTitleComponent } from './components/utils/section-title/section-title.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HomePageComponent,
    SectionTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
