import { Entry } from 'src/app/models/entry.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-statement',
  templateUrl: './entry-statement.component.html',
  styleUrls: ['./entry-statement.component.css']
})
export class EntryStatementComponent implements OnInit {

  @Input() entry: Entry = new Entry();

  constructor() {
  }

  ngOnInit(): void {
  }

}
