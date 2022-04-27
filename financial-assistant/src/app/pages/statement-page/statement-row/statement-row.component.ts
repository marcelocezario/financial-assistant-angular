import { Entry } from 'src/app/models/entry.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statement-row',
  templateUrl: './statement-row.component.html',
  styleUrls: ['./statement-row.component.css']
})
export class StatementRowComponent implements OnInit {

  @Input() entry: Entry = new Entry();

  constructor() { }

  ngOnInit(): void {
  }

}
