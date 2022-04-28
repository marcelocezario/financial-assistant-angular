export class Category {

  id?: number;
  name: string;
  budget: number;
  icon: string;

  constructor() {
    this.id = undefined;
    this.name = "";
    this.budget = 0;
    this.icon = "category";
  }

}
