import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../interfaces/user.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-phone';
import icClock from '@iconify/icons-ic/timer';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import icDollar from '@iconify/icons-ic/outline-money';
import {Services} from '../../../../Services/services'

@Component({
  selector: 'vex-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.scss']
})
export class UserCreateUpdateComponent implements OnInit {

  static id = 100;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  agency={};

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icClock=icClock;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icDollar = icDollar;
  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
              private fb: FormBuilder,
              private Services: Services) {
  }

  ngOnInit() {
    this.getAdminList();
    if (this.defaults) {
      this.mode = 'update';
      let user= this.defaults;
      //console.log(this.defaults)
     
      this.defaults= {
        "_id":user._id,
      "name": user.name,
      "email": user.email,
      "type": user.type,
      
      }
      //console.log(this.defaults)
    } else {
      this.defaults = {} as User;
    }
    this.form = this.fb.group({
      name: [this.defaults.name || ''],
      email: [this.defaults.email || ''],
      type: this.defaults.type || '',
      
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  createUser() {
    const user = this.form.value;

    if (!user.imageSrc) {
      user.imageSrc = 'assets/img/avatars/1.jpg';
    }

    let body= {
      "name": user.name,
      "email": user.email,
      "type": user.type
    }
     //console.log("--->",body)
      this.createAdmin(body);
  }

  createAdmin(body) {
    this.Services.createAdmin(body)
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

  updateUser() {
    const user = this.form.value;
    user.id = this.defaults.id;
    let body= {
      "name": user.name,
      "email": user.email,
      "type": user.type,
    }
    this.updateAdmin(body)
    
  }
  updateAdmin(body) {
    let user_id = this.defaults._id;
    this.Services.updateAdmin( user_id, body)
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
  UsersList=[]
  getAdminList() {
    this.Services.getAdminList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.UsersList=data.data;
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
