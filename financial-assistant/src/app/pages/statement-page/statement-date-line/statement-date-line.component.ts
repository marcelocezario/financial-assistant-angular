import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-statement-date-line',
  templateUrl: './statement-date-line.component.html',
  styleUrls: ['./statement-date-line.component.css']
})
export class StatementDateLineComponent implements OnInit {

  @Input() date: Date = new Date();

  public formatedDate: string = "";

  constructor() { }

  ngOnInit(): void {
    moment.locale("pt-br")
    this.formatedDate = moment(this.date).calendar(null, {
      lastDay: '[Ontem]',
      sameDay: '[Hoje]',
      nextDay: '[Amanhã]',
      lastWeek: '[Última] dddd',
      nextWeek: '[Próxima] dddd',
      sameElse: 'L'
    });
  }

}
