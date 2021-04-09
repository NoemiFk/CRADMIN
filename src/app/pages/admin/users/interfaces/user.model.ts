export class User {
  _id:String
  name: String;
	storage: Number;
	payment: Number;
	contract: String;
	days: Number;
	active: Boolean;
	Benefits: any;
	billing: Boolean;

  constructor(user) {
    this._id=user._id;
    this.name=user.name;
    this.storage=user.storage;
    this.days=user.days;
    this.contract=user.contract;
    this.active=user.active;
    this.Benefits=user.Benefits;
    this.billing=user.billing;
  }




  set getaddress(value) {
  }
}
