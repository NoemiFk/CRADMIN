import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plan } from '../interfaces/plan.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icClock from '@iconify/icons-ic/timer';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icHost from '@iconify/icons-ic/round-horizontal-split';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import icDollar from '@iconify/icons-ic/outline-money';
import {Services} from '../../../../Services/services'
import baselinePriceChange from '@iconify-icons/ic/baseline-price-change';


@Component({
  selector: 'vex-plan-create-update',
  templateUrl: './plan-create-update.component.html',
  styleUrls: ['./plan-create-update.component.scss']
})
export class PlanCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  agency={};

  icMoreVert = icMoreVert;
  icClose = icClose;
  icClock=icClock;
  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icDollar = icDollar;
  icPhone = icPhone;
  icHost = icHost;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<PlanCreateUpdateComponent>,
              private fb: FormBuilder,
              private Services: Services) {
  }

  ngOnInit() {
    this.getPlansList();
    if (this.defaults) {
      this.mode = 'update';
      let plan= this.defaults;
      //console.log(this.defaults)
     
      this.defaults= {
        "_id":plan._id,
      "name": plan.name,
      "storage": plan.storage,
      "payment": plan.payment,
      "active": plan.active,
      "contract": plan.contract,
      "activeTest": plan.trialPeriod.active,
      "days": plan.trialPeriod.days,
      "Benefits":plan.Benefits
      
      }
      //console.log("--------",this.defaults)
    } else {
      this.defaults = {} as Plan;
    }
    this.form = this.fb.group({
      storage: [this.defaults.storage || 8],
      name: [this.defaults.name || ''],
      payment: [this.defaults.payment || 0],
      active: [this.defaults.active || true],
      contract: [this.defaults.contract || 'Mensual'],
      Benefits: [this.defaults.Benefits || ''],
      activeTest: [this.defaults.activeTest || true],
      days: [this.defaults.days || 10], 
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createPlan();
    } else if (this.mode === 'update') {
      this.updatePlan();
    }
  }

  createPlan() {
    const plan = this.form.value;

    if (!plan.imageSrc) {
      plan.imageSrc = 'assets/img/avatars/1.jpg';
    }

    let body= {
      "name": plan.name,
      "storage": plan.storage,
      "payment": plan.payment,
      "contract": plan.contract,
      "days": plan.days,
      "active": plan.active,
      "trialPeriod": {
        "days": plan.date,
        "active": plan.activeTest
      },
      "Benefits":plan.Benefits
    }
     //console.log("--->",body)
      this.createPlans(body);
  }

  createPlans(body) {
    this.Services.createPlan(body)
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.agency=data.data
            this.dialogRef.close(data.data);
          }
        },
        error => {
          //this.error=true
        });
  }

  updatePlan() {
    const plan = this.form.value;
    plan.id = this.defaults.id;
    let body= {
      "name": plan.name,
      "storage": plan.storage,
      "payment": plan.payment,
      "contract": plan.contract,
      "days": plan.days,
      "active": plan.active,
      "trialPeriod": {
        "days": plan.date,
        "active": plan.activeTest
      },
      "Benefits":plan.Benefits
    }
    this.updatePlans(body)
    
  }
  updatePlans(body) {
    let plan_id = this.defaults._id;
    this.Services.updatePlan( plan_id, body)
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.agency=data.data
            this.dialogRef.close(data.data);
          }
        },
        error => {
          //this.error=true
        });
  }
  PlansList=[]
  getPlansList() {
    this.Services.getPlansList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.PlansList=data.data;
          }
        },
        error => {
          //this.error=true
        });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
