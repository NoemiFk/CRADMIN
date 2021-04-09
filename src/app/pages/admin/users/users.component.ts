import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from './interfaces/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
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
  selector: 'vex-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
export class UserComponent implements OnInit, AfterViewInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  plans: User[];
  UsersList:[];

  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Nombre', property: 'name', type: 'text', visible: true },
    { label: 'E-mail', property: 'email', type: 'text', visible: true },
    { label: 'Contraseña', property: 'password', type: 'text', visible: true },
    { label: 'Tipo', property: 'type', type: 'text', visible: true },
    { label: 'Activo', property: 'active', type: 'text',visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
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
    return of(list.map(plan => plan));
  }
  getAdminList() {
    this.Services.getAdminList()
    .subscribe(
        data => {
          //console.log("Hola ", data)
          if(data.success){
            this.UsersList=data.data
            
            //return this.UsersList;
            this.getData(this.UsersList).subscribe(plans => {
              this.subject$.next(plans);
            });
            //this.dataSource = new MatTableDataSource();

          this.data$.pipe(
            filter<User[]>(Boolean)
          ).subscribe(plans => {
            //console.log(plans)
            this.plans = plans;
            this.dataSource.data = plans; //this.UsersList;
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
    this.getAdminList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log("-->",this.dataSource)
  }

  createAdmin() {
    this.dialog.open(UserCreateUpdateComponent).afterClosed().subscribe((plan: User) => {
      /**
       * User is the updated plan (if the user pressed Save - otherwise it's null)
       */
      if (plan) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.plans.unshift(plan);
        this.subject$.next(this.plans);
      }
    });
  }

  updateAdmin(plan: User) {
    this.dialog.open(UserCreateUpdateComponent, {
      data: plan
    }).afterClosed().subscribe(updatedUser => {
      /**
       * User is the updated plan (if the user pressed Save - otherwise it's null)
       */
      if (updatedUser) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
        
        const index = this.plans.findIndex((existingUser) => existingUser._id === updatedUser._id);
        this.plans[index] = new User(updatedUser);
        this.subject$.next(this.plans);*/
        this.getAdminList();
      }
    });
  }

  deleteUser(plan: User) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */

    this.dialog.open(UserDeleteComponent, {
      data: plan
    }).afterClosed().subscribe(updatedUser => {
      /**
       * User is the updated plan (if the user pressed Save - otherwise it's null)
       */
      if (updatedUser) {
        /**
         * Here we are updating our local array.
         * You would probably make an HTTP request here.
         */
        this.plans.splice(this.plans.findIndex((existingUser) => existingUser._id === plan._id), 1);
        this.selection.deselect(plan);
        this.subject$.next(this.plans);
      }
    });
  }

  deleteUsers(plans: User[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    plans.forEach(c => this.deleteUser(c));
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

  onLabelChange(change: MatSelectChange, row: User) {
    const index = this.plans.findIndex(c => c === row);
    //this.plans[index].labels = change.value;
    this.subject$.next(this.plans);
  }
}
