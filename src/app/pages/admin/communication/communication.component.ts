import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Communication } from './interfaces/communication.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { CommunicationCreateUpdateComponent } from './communication-create-update/communication-create-update.component';
import { CommunicationDeleteComponent } from './communication-delete/communication-delete.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
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
  selector: 'vex-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss'],
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
export class CommunicationComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Communication[]> = new ReplaySubject<Communication[]>(1);
  data$: Observable<Communication[]> = this.subject$.asObservable();
  communications: Communication[];
  CommunicationsList:[];



  @Input()
  columns: TableColumn<Communication>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Nombre', property: 'name', type: 'text', visible: true },
    { label: 'Precio', property: 'price', type: 'number', visible: true },
    { label: 'Costo', property: 'cost', type: 'number', visible: true },
    { label: 'Contrato', property: 'contract', type: 'text', visible: false },
    { label: 'Estatus', property: 'active', type: 'boolean',visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<Communication> | null;
  selection = new SelectionModel<Communication>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
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
    return of(list.map(communication => communication));
  }
  getCommunicationsList() {
    this.Services.getCommunicationsList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.CommunicationsList=data.data
            
            //return this.CommunicationsList;
            this.getData(this.CommunicationsList).subscribe(communications => {
              this.subject$.next(communications);
            });
            //this.dataSource = new MatTableDataSource();

          this.data$.pipe(
            filter<Communication[]>(Boolean)
          ).subscribe(communications => {
            //console.log(communications)
            this.communications = communications;
            this.dataSource.data = communications; //this.CommunicationsList;
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
     //console.log("Activar ")
    this.getCommunicationsList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log("-->",this.dataSource)
  }

  createCommunication() {
    this.dialog.open(CommunicationCreateUpdateComponent).afterClosed().subscribe((communication: Communication) => {
      /**
       * Communication is the updated communication (if the user pressed Save - otherwise it's null)
       */
      if (communication) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.communications.unshift(communication);
        this.subject$.next(this.communications);
      }
    });
  }

  updateCommunication(communication: Communication) {
    this.dialog.open(CommunicationCreateUpdateComponent, {
      data: communication
    }).afterClosed().subscribe(updatedCommunication => {
      /**
       * Communication is the updated communication (if the user pressed Save - otherwise it's null)
       */
      if (updatedCommunication) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
        
        const index = this.communications.findIndex((existingCommunication) => existingCommunication._id === updatedCommunication._id);
        this.communications[index] = new Communication(updatedCommunication);
        this.subject$.next(this.communications);*/
        this.getCommunicationsList();
      }
    });
  }

  deleteCommunication(communication: Communication) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

    this.dialog.open(CommunicationDeleteComponent, {
      data: communication
    }).afterClosed().subscribe(updatedCommunication => {
      /**
       * Communication is the updated communication (if the user pressed Save - otherwise it's null)
       */
      if (updatedCommunication) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.communications.splice(this.communications.findIndex((existingCommunication) => existingCommunication._id === communication._id), 1);
        this.selection.deselect(communication);
        this.subject$.next(this.communications);
      }
    });
  }

  deleteCommunications(communications: Communication[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    communications.forEach(c => this.deleteCommunication(c));
  }

  changeStatus(status, id){
    console.log("Estatus")
     this.Services.statusCommunication(status,id)
     .subscribe(
         data => {
           //console.log("Hola ", data)
           if(data.success){
            this.getCommunicationsList();
           }
         },
         error => {
           //this.error=true
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

  onLabelChange(change: MatSelectChange, row: Communication) {
    const index = this.communications.findIndex(c => c === row);
    //this.communications[index].labels = change.value;
    this.subject$.next(this.communications);
  }
}
