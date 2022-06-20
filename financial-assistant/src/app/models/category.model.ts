export class Category {

  id?: number;
  name: string;
  budget: number;
  icon: string;
  credit: boolean;

  constructor() {
    this.id = undefined;
    this.name = "";
    this.budget = 0;
    this.icon = "category";
    this.credit = false;
  }

}
