export class Plan {
  _id:String
  name: String;
	storage: Number;
	payment: Number;
	contract: String;
	days: Number;
	active: Boolean;
	Benefits: any;
	billing: Boolean;

  constructor(plan) {
    this._id=plan._id;
    this.name=plan.name;
    this.storage=plan.storage;
    this.days=plan.days;
    this.contract=plan.contract;
    this.active=plan.active;
    this.Benefits=plan.Benefits;
    this.billing=plan.billing;
  }




  set getaddress(value) {
  }
}
