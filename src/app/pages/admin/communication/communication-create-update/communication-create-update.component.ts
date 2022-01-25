import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Communication } from '../interfaces/communication.model';
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
  selector: 'vex-communication-create-update',
  templateUrl: './communication-create-update.component.html',
  styleUrls: ['./communication-create-update.component.scss']
})
export class CommunicationCreateUpdateComponent implements OnInit {

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
              private dialogRef: MatDialogRef<CommunicationCreateUpdateComponent>,
              private fb: FormBuilder,
              private Services: Services) {
  }

  ngOnInit() {
    this.getCommunicationsList();
    if (this.defaults) {
      this.mode = 'update';
      let communication= this.defaults;
      //console.log(this.defaults)
     
      this.defaults= {
        "_id":communication._id,
      "name": communication.name,
      "description" : communication.description,
      "cost": communication.cost,
      "price": communication.price,
      "active": communication.active
      
      }
    console.log("--------",this.defaults)
    } else {
      this.defaults = {} as Communication;
    }
    this.form = this.fb.group({
      price: [this.defaults.price || 0],
      name: [this.defaults.name || ''],
      description: [this.defaults.description || ''],
      cost: [this.defaults.cost || 0],
      active: [this.defaults.active || true], 
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createCommunication();
    } else if (this.mode === 'update') {
      this.updateCommunication();
    }
  }

  createCommunication() {
    const communication = this.form.value;

    if (!communication.imageSrc) {
      communication.imageSrc = 'assets/img/avatars/1.jpg';
    }

    let body= {
      "name": communication.name,
      "description": communication.description,
      "price": communication.price,
      "cost": communication.cost,
      "active": communication.active,
    }
     //console.log("--->",body)
      this.createCommunications(body);
  }

  createCommunications(body) {
    this.Services.createCommunication(body)
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

  updateCommunication() {
    const communication = this.form.value;
    communication.id = this.defaults.id;
    let body= { 
      "name": communication.name,
      "description": communication.description,
      "price": communication.price,
      "cost": communication.cost,
      "active": communication.active,
    }
    this.updateCommunications(body)
    
  }
  updateCommunications(body) {
    let communication_id = this.defaults._id;
    this.Services.updateCommunication( communication_id, body)
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
  CommunicationsList=[]
  getCommunicationsList() {
    this.Services.getCommunicationsList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.CommunicationsList=data.data;
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
