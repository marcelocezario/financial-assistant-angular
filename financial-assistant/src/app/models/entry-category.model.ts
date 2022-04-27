import { Category } from './category.model';
export class EntryCategory {

  category: Category;
  value: number;

  constructor() {
    this.category = new Category();
    this.value = 0;
  }

}
