import { Entry } from 'src/app/models/entry.model';
import { EntryService } from './../../services/controllers/entry/entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-page',
  templateUrl: './statement-page.component.html',
  styleUrls: ['./statement-page.component.css']
})
export class StatementPageComponent implements OnInit {

  constructor(private entryService: EntryService) { }

  public entries: Entry[] = [];

  public dates: string[] = [];

  ngOnInit(): void {
    this.dates = [];
    this.entryService.getEntries().subscribe(response => {
      this.entries = response;
    });
  }

  checkIsRepeatedDate(index: number) : boolean {
    if (index == 0) return true;

    let lastDate = new Date(this.entries[index - 1].moment).toDateString();
    let currentDate = new Date(this.entries[index].moment).toDateString();

    return lastDate != currentDate;
  }


}
