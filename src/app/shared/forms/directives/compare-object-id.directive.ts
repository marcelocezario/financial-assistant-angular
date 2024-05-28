import { Directive, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: '[appCompareObjectId]',
  standalone: true
})
export class CompareObjectIdDirective implements OnInit {

  constructor(private matSelect: MatSelect) { }

  ngOnInit(): void {
    this.matSelect.compareWith = this.compareObjectId;
  }

  compareObjectId = (obj1: any, obj2: any) => {
    return obj1?.id && obj2?.id ? obj1.id === obj2.id : obj1 === obj2;
  }

}
