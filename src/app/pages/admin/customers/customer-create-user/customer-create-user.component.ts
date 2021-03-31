import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../interfaces/customer.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import { MatTableDataSource } from '@angular/material/table';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import icDollar from '@iconify/icons-ic/outline-money';
import {Services} from '../../../../Services/services'


@Component({
  selector: 'vex-customer-create-user',
  templateUrl: './customer-create-user.component.html',
  styleUrls: ['./customer-create-user.component.scss']
})
export class CustomerUsersComponent implements OnInit {
  
  static id = 100;
  displayedColumns: string[] = ['Usuario', 'E-mail', 'Rol', 'Acciones'];
  dataSource = [];

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  agency={};

  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icDollar = icDollar;
  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CustomerUsersComponent>,
              private fb: FormBuilder,
              private Services: Services) {
  }

  ngOnInit() {
    //this.dataSource = new MatTableDataSource();
    
    this.getUsersList();
    if (this.defaults) {
      let customer= this.defaults;
     
      this.defaults= {
        "_id":customer._id,
      }
      console.log(this.defaults)
    } 
    this.form = this.fb.group({
      name: [this.defaults.name || ''],
      rol: [this.defaults.rol || ''],
      email: this.defaults.email || ''
      
    });
  }


  

  user={};
  createUser() {
    const user = this.form.value;
    let body ={
      name: user.name,
      rol: user.rol,
      email: user.email,
      agency_id: this.defaults._id
    }
    this.Services.createUser(body)
    .subscribe(
        data => {
          console.log("Hola ", data)
          if(data.success){
            this.user=data.data
            this.getUsersList();
            //this.dialogRef.close(data.data);
          }
        },
        error => {
          //this.error=true
        });
  }
  //dataSource={}
  getUsersList(){
    let id= this.defaults._id;
    this.Services.getUsersList(id)
    .subscribe(
        data => {
          console.log("Hola ", data)
          if(data.success){
            this.dataSource=data.data
            //this.getUsersList();
            //this.dialogRef.close(data.data);
          }
        },
        error => {
          //this.error=true
        });
  }

  deleteUser(id){
    
    this.Services.deleteUser(id)
    .subscribe(
        data => {
          console.log("Hola ", data)
          if(data.success){
            this.getUsersList();
          }
        },
        error => {
          //this.error=true
        });

  }

}
