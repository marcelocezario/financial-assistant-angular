import { EntryCategory } from './entry-category.model';
export class Entry {

  id?: number;
  value: number;
  moment: Date;
  comments: string;
  categories: EntryCategory[];
  credit: boolean;

  constructor() {
    this.id = undefined;
    this.value = 0;
    this.moment = new Date();
    this.comments = "";
    this.categories = [];
    this.credit = false;
  }

}
