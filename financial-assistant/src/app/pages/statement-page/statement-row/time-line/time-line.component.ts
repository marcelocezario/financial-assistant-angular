import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  @Input() credit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
