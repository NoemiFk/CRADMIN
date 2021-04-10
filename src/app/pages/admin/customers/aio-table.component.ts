import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Customer } from './interfaces/customer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerUsersComponent } from './customer-create-user/customer-create-user.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icAnaliys from '@iconify/icons-ic/graphic-eq';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icDownload from '@iconify/icons-ic/cloud-download';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';

import {Services} from '../../../Services/services'


@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class AioTableComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];
  AgenciesList:[];



  @Input()
  columns: TableColumn<Customer>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Imagen', property: 'image', type: 'image', visible: false },
    { label: 'Agencia', property: 'nameAgency', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Razón Social', property: 'bussinesName', type: 'text', visible: false, cssClasses: ['font-medium'] },
    { label: 'Tipo', property: 'type', type: 'text', visible: false, cssClasses: ['font-medium'] },
    { label: 'RFC', property: 'RFC', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Nombre', property: 'name', type: 'text', visible: true },
    { label: 'Telefono', property: 'phone', type: 'text', visible: true },
    { label: 'E-mail', property: 'email', type: 'text', visible: true },
    { label: 'Estatus', property: 'status', type: 'boolean', visible: true },
    { label: 'Calle', property: 'address1', type: 'object', object:'address',visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'No. Int', property: 'int', type: 'object', object:'address', visible: false },
    { label: 'No. Ext', property: 'ext', type: 'object', object:'address', visible: false },
    { label: 'C.P', property: 'zipcode', type: 'object', object:'address', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Colonia', property: 'address2', type: 'object', object:'address', visible: false },
    { label: 'Municipio', property: 'municipality', type: 'object', object:'address', visible: false },
    { label: 'Ciudad', property: 'city', type: 'object', object:'address', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Estado', property: 'state', type: 'object', object:'address', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Pais', property: 'country', type: 'object', object:'address', visible: false },
    { label: 'Plan', property: 'plan', type: 'object', object:'contract', visible: false },
    { label: 'Contrato', property: 'date', type: 'object', object:'contract', visible: false },
    { label: 'Pago', property: 'payment', type: 'object', object:'contract', visible: false },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Customer> | null;
  selection = new SelectionModel<Customer>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icAnaliys=icAnaliys;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icDownload=icDownload;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,  private Services: Services,) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData(list) {
    //console.log("-->",list)
    return of(list.map(customer => customer));
  }
  getAgenciesList() {
    this.Services.getAgenciesList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.AgenciesList=data.data
            
            //return this.AgenciesList;
            this.getData(this.AgenciesList).subscribe(customers => {
              this.subject$.next(customers);
            });
            //this.dataSource = new MatTableDataSource();

          this.data$.pipe(
            filter<Customer[]>(Boolean)
          ).subscribe(customers => {
            //console.log(customers)
            this.customers = customers;
            this.dataSource.data = customers; //this.AgenciesList;
          });
          //console.log("-->",this.dataSource)
          this.searchCtrl.valueChanges.pipe(
            untilDestroyed(this)
          ).subscribe(value => this.onFilterChange(value));
            //this.ClientAddList=data.data
            ////console.log("--",this.usersList)
          }
        },
        error => {
          //this.error=true
        });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getAgenciesList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log("-->",this.dataSource)
  }

  createCustomer() {
    this.dialog.open(CustomerCreateUpdateComponent).afterClosed().subscribe((customer: Customer) => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (customer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.unshift(customer);
        this.subject$.next(this.customers);
      }
    });
  }

  updateCustomer(customer: Customer) {
    this.dialog.open(CustomerCreateUpdateComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
        
        const index = this.customers.findIndex((existingCustomer) => existingCustomer._id === updatedCustomer._id);
        this.customers[index] = new Customer(updatedCustomer);
        this.subject$.next(this.customers);*/
        this.getAgenciesList();
      }
    });
  }

  deleteCustomer(customer: Customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

    this.dialog.open(CustomerDeleteComponent, {
      data: customer
    }).afterClosed().subscribe(updatedCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (updatedCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer._id === customer._id), 1);
        this.selection.deselect(customer);
        this.subject$.next(this.customers);
      }
    });
  }

  deleteCustomers(customers: Customer[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    customers.forEach(c => this.deleteCustomer(c));
  }

  usersCustomer(customer: Customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

    this.dialog.open(CustomerUsersComponent, {
      data: customer
    }).afterClosed().subscribe(usersCustomer => {
      /**
       * Customer is the updated customer (if the user pressed Save - otherwise it's null)
       */
      if (usersCustomer) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.selection.deselect(customer);
        this.subject$.next(this.customers);
      }
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  changeStatus(status, id){
    console.log("Estatus")
     this.Services.statusAgency(status,id)
     .subscribe(
         data => {
           //console.log("Hola ", data)
           if(data.success){
            this.getAgenciesList();
           }
         },
         error => {
           //this.error=true
         });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: Customer) {
    const index = this.customers.findIndex(c => c === row);
    //this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

   setFoliosToExcel() {
    let data = this.AgenciesList;
    this.exportCSVFile(data,"Collection Robot Clientes");
  }
  
   exportCSVFile(items, fileName) {
    let jsonObject = JSON.stringify(items);
    let csv = this.convertToCSV(jsonObject);
    let exportName = fileName + '.csv' || 'export.csv';
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportName);
    } else {
      let link = document.createElement('a');
      if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

   convertToCSV(objArray) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
   let  str = "";
    for (var i = 0; i < array.length; i++) {
      var row = "";
      console.log("--",array[i])
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in array[i]) {
       
        if( typeof array[i][index] != 'object'){
          console.log("**",array[i][index] )
          row += '"' + array[i][index] + '",';
        }
        else{
          console.log("******",array[i][index] )
          let array2 = array[i][index];
            for (var index in array2) {
              console.log("*",array2[index] )
                row += '"' + array2[index] + '",';
            }
          }
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      str += row + '\r\n';
  }
    return str;
  }
}
