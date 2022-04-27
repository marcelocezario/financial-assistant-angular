import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-entry-statement',
  templateUrl: './entry-statement.component.html',
  styleUrls: ['./entry-statement.component.css']
})
export class EntryStatementComponent implements OnInit {

  @Input() credit: boolean = false;

  constructor() {
    moment.locale("pt-br")
  }

  public entry = {
    moment: new Date(),
    value: 58.99,
    account: "Carteira",
    comments: "Compras mercado",
    categories: [
      { name: "Alimentação", value: 30 },
      { name: "Pet", value: 15 },
      { name: "Produtos Limpeza", value: 13.99 }
    ]

  }

  ngOnInit(): void {
  }

}
