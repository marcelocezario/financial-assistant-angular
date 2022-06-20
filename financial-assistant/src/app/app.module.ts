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
import { StatementDateLineComponent } from './pages/statement-page/statement-row/statement-date-line/statement-date-line.component';
import { MatChipsModule } from '@angular/material/chips';
import { CategoryChipComponent } from './pages/statement-page/statement-row/entry-statement/category-chip/category-chip.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryPageComponent } from './pages/categories/category-page/category-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditCategoryPageComponent } from './pages/categories/edit-category-page/edit-category-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { FloatButtonComponent } from './components/utils/float-button/float-button.component';
import { TopNavigationBarComponent } from './components/template/top-navigation-bar/top-navigation-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    StatementDateLineComponent,
    CategoryChipComponent,
    CategoryPageComponent,
    EditCategoryPageComponent,
    FloatButtonComponent,
    TopNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    HttpClientModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonToggleModule,
    FormsModule,
    MatToolbarModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
