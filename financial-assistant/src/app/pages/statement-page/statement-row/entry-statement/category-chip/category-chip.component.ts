import { EntryCategory } from './../../../../../models/entry-category.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.css']
})
export class CategoryChipComponent implements OnInit {

  @Input() entryCategory: EntryCategory = new EntryCategory();

  constructor() { }

  ngOnInit(): void {
  }

}
