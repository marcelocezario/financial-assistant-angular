import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statement-row',
  templateUrl: './statement-row.component.html',
  styleUrls: ['./statement-row.component.css']
})
export class StatementRowComponent implements OnInit {

  @Input() credit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
