export class Communication {
  _id:String
  name: String;
  description: String;
	price: Number;
	cost: Number;
	active: Boolean;

  constructor(plan) {
    this._id=plan._id;
    this.name=plan.name;
    this.description=plan.description;
    this.price=plan.price;
    this.cost=plan.cost;
    this.active=plan.active;
  }

}
