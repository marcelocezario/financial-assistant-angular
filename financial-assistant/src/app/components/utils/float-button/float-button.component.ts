import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {

  @Input() matIcon: string = "save";

  @Output() actionButton = new EventEmitter<boolean>();

  public positionBottom: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  clickButton() {
    this.actionButton.emit(true);
  }

}
