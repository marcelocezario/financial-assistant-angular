import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './components/template/body/body.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SectionTitleComponent } from './components/utils/section-title/section-title.component';
import { BottomNavigationBarComponent } from './components/template/bottom-navigation-bar/bottom-navigation-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StatementPageComponent } from './pages/statement-page/statement-page.component';
import { StatementRowComponent } from './pages/statement-page/statement-row/statement-row.component';
import { TimeLineComponent } from './pages/statement-page/statement-row/time-line/time-line.component';
import { EntryStatementComponent } from './pages/statement-page/statement-row/entry-statement/entry-statement.component';
import { StatementDateLineComponent } from './pages/statement-page/statement-date-line/statement-date-line.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HomePageComponent,
    SectionTitleComponent,
    BottomNavigationBarComponent,
    StatementPageComponent,
    StatementRowComponent,
    TimeLineComponent,
    EntryStatementComponent,
    StatementDateLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
