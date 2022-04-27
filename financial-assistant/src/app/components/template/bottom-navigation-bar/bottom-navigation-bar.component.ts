import { ROUTES_KEYS } from './../../../config/routes-keys.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation-bar',
  templateUrl: './bottom-navigation-bar.component.html',
  styleUrls: ['./bottom-navigation-bar.component.css']
})
export class BottomNavigationBarComponent implements OnInit {

  constructor() { }

  public homePageLink = "/" + ROUTES_KEYS.home;
  public statementPageLink = "/" + ROUTES_KEYS.statement;

  ngOnInit(): void {
  }

}
