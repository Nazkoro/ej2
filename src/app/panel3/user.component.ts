import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  VirtualScrollService,
  FilterService,
  ToolbarService, PageService, EditService
} from '@syncfusion/ej2-angular-grids';
import {
  EditSettingsModel,
  FilterSettingsModel, IFilter,
  SaveEventArgs
} from '@syncfusion/ej2-angular-grids';

// import { DateTime } from 'luxon';
// import { FileDownloadService } from '@shared/utils/file-download.service';
// import { DateTimeService } from '@app/shared/common/timing/date-time.service';
// import { AppComponentBase } from '@shared/common/app-component-base';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberInputEventInterface } from './shared/interfaces/numberInputEvent.interface';
import { GenderEnum } from './shared/constant/gender.enum';
import { UserInterface } from './shared/interfaces/user.interface';
import { EmployeeDto } from './shared/class/employ'
import { UserService } from '../service/user.service'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [FilterService, VirtualScrollService, ToolbarService, EditService, PageService],
})
export class UserComponent implements OnInit, OnDestroy {
  fields = { text: 'text', value: 'value' };
  initialPage: { pageSizes: number[]; pageCount: number; pageSize: number; enableQueryString: boolean; };
  data = {
    // @ts-ignore
    result: [],
    count: 0
  };
  filterSettings: FilterSettingsModel;
  editSettings: EditSettingsModel;
  toolbar = ['Add', 'Edit', 'Delete', 'Exel Export', 'Search'];
  mainForm: FormGroup;
  genderData = ['', 'M', 'F'];
  filterText = '';
  maxidcompanyFilter: number;
  maxidcompanyFilterEmpty: number;
  minidcompanyFilter: number;
  minidcompanyFilterEmpty: number;
  maxexternalidFilter: number;
  maxexternalidFilterEmpty: number;
  minexternalidFilter: number;
  minexternalidFilterEmpty: number;
  maxpayeeidFilter: number;
  maxpayeeidFilterEmpty: number;
  minpayeeidFilter: number;
  minpayeeidFilterEmpty: number;
  title = '';
  surname = '';
  firstname = '';
  middlename = '';
  preferredname = '';
  maxgenderFilter: number;
  maxgenderFilterEmpty: number;
  mingenderFilter: number;
  mingenderFilterEmpty: number;
  // maxbirthdateFilter: DateTime | null;
  // minbirthdateFilter: DateTime | null;
  gender = '';
  email = '';
  mobilephone = '';
  homephone = '';
  workphone = '';
  maxidaddressFilter: number;
  maxidaddressFilterEmpty: number;
  minidaddressFilter: number;
  minidaddressFilterEmpty: number;
  maxidpostaladdressFilter: number;
  maxidpostaladdressFilterEmpty: number;
  minidpostaladdressFilter: number;
  minidpostaladdressFilterEmpty: number;
  emergencycont = '';
  emergencynumb = '';
  maxiduserFilter: number;
  maxiduserFilterEmpty: number;
  miniduserFilter: number;
  miniduserFilterEmpty: number;
  enableFilter = -1;
  sorting = '';
  row = 10;
  first = 0;
  editParams = { params: { popupHeight: '300px' } };
  submitClicked = false;
  filterId: IFilter;
  subscription: Subscription;
  updateId: number;

  constructor(
    // injector: Injector,
    // private _employeeServiceProxy: EmployeeServiceProxy,
    // private _fileDownloadService: FileDownloadService,
    // private _dateTimeService: DateTimeService,
    private userService: UserService
  ) {
    // super(injector);
  }

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.initialPage = { pageSizes: [10, 25, 50, 100, 500], pageCount: 3, pageSize: 10, enableQueryString: false };
    this.filterSettings = { type: 'Menu', operators: {
        stringOperator: [
          { value: 'contains', text: 'contains' }
        ]
      }};
    this.filterId = {
      type: 'FilterBar'
    };
    this.getEmployee();
  }

  createFormGroup(data: UserInterface): FormGroup {
    return new FormGroup({
      idcompany: new FormControl(data.idcompany, Validators.required),
      externalid: new FormControl(data.externalid),
      payeeid: new FormControl(data.payeeid),
      title: new FormControl(data.title),
      surname: new FormControl(data.surname, Validators.required),
      firstname: new FormControl(data.firstname, Validators.required),
      middlename: new FormControl(data.middlename),
      preferredname: new FormControl(data.preferredname),
      gender: new FormControl(data.gender, Validators.required),
      // birthdate: new FormControl(data.birthdate),
      email: new FormControl(data.email),
      mobilephone: new FormControl(data.mobilephone),
      homephone: new FormControl(data.homephone),
      workphone: new FormControl(data.workphone),
      idaddress: new FormControl(data.idaddress),
      idpostaladdress: new FormControl(data.idpostaladdress),
      emergencycont: new FormControl(data.emergencycont),
      emergencynumb: new FormControl(data.emergencynumb),
      iduser: new FormControl(data.iduser, Validators.required),
      enable: new FormControl(data.enable, Validators.required)
    });
  }

  actionBegin(args: SaveEventArgs | any): void {
    if (args.requestType === 'searching') {
      this.filterText = args.searchString;
      this.getEmployee();
    }

    if (args.requestType === 'add' || args.requestType === 'beginEdit') {
      this.submitClicked = false;
      this.updateId = args.rowData.id ? args.rowData.id : 0;
      this.mainForm = this.createFormGroup(args.rowData);
    }

    if (args.currentPage !== args.previousPage) {
      this.first = (args.currentPage - 1) * 10;
      this.getEmployee();
    }

    if (args.requestType === 'save') {
      this.createOrEditEmployee({...args.data, gender: `${GenderEnum[args.data.gender]}` });
      this.getEmployee();
    }

    if (args.requestType === 'sorting') {
      this.sorting = `${args.columnName} ${args.direction === 'Ascending' ? 'ASC' : 'DESC'}`;
      if (!args.direction) { this.sorting = ''; }
      this.getEmployee();
    }

    if (args.requestType === 'paging') {
      this.row = +(document.getElementById('ej2_dropdownlist_0_hidden').children[0].innerHTML);
      this.getEmployee();
    }

    if (args.requestType === 'delete') {
      this.deleteEmployee(args.data[0]);
      this.getEmployee();
    }

    if (args.action === 'filter') {
      // @ts-ignore
      this[args.currentFilterObject.field] = args.currentFilterObject.value;
      this.getEmployee();
    }

    if (args.action === 'clearFilter') {
      // @ts-ignore
      this[args.currentFilterObject.field] = '';
      this.getEmployee();
    }
  }

  getEmployee(): void {
    this.userService.getUsers().subscribe(result => {
      console.log("result", result)
      // this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.data = {
        result: [],
        count: 0
      };
      result.forEach((el: { employee: any; }) => {
        this.data.result.push({
          ...el,
          // birthdate: `${el.employee.birthdate.year}-${el.employee.birthdate.month}-${el.employee.birthdate.day}`,
          check: true
        });
      });

      this.data.count = result.totalCount;
      // this.primengTableHelper.hideLoadingIndicator();
    });




    //
    // this.primengTableHelper.showLoadingIndicator();
    // this._employeeServiceProxy.getAll(
    //   this.filterText,
    //   this.maxidcompanyFilter == null ? this.maxidcompanyFilterEmpty : this.maxidcompanyFilter,
    //   this.minidcompanyFilter == null ? this.minidcompanyFilterEmpty : this.minidcompanyFilter,
    //   this.maxexternalidFilter == null ? this.maxexternalidFilterEmpty : this.maxexternalidFilter,
    //   this.minexternalidFilter == null ? this.minexternalidFilterEmpty : this.minexternalidFilter,
    //   this.maxpayeeidFilter == null ? this.maxpayeeidFilterEmpty : this.maxpayeeidFilter,
    //   this.minpayeeidFilter == null ? this.minpayeeidFilterEmpty : this.minpayeeidFilter,
    //   this.title,
    //   this.surname,
    //   this.firstname,
    //   this.middlename,
    //   this.preferredname,
    //   this.gender,
    //   // this.maxbirthdateFilter === undefined ? this.maxbirthdateFilter : this._dateTimeService.getEndOfDayForDate(this.maxbirthdateFilter),
    //   // this.minbirthdateFilter === undefined ? this.minbirthdateFilter : this._dateTimeService.getStartOfDayForDate(this.minbirthdateFilter),
    //   this.email,
    //   this.mobilephone,
    //   this.homephone,
    //   this.workphone,
    //   this.maxidaddressFilter === null ? this.maxidaddressFilterEmpty : this.maxidaddressFilter,
    //   this.minidaddressFilter === null ? this.minidaddressFilterEmpty : this.minidaddressFilter,
    //   this.maxidpostaladdressFilter == null ? this.maxidpostaladdressFilterEmpty : this.maxidpostaladdressFilter,
    //   this.minidpostaladdressFilter == null ? this.minidpostaladdressFilterEmpty : this.minidpostaladdressFilter,
    //   this.emergencycont,
    //   this.emergencynumb,
    //   this.maxiduserFilter == null ? this.maxiduserFilterEmpty : this.maxiduserFilter,
    //   this.miniduserFilter == null ? this.miniduserFilterEmpty : this.miniduserFilter,
    //   this.enableFilter,
    //   this.sorting ? this.sorting : '',
    //   this.first ? this.first : 0,
    //   this.row ? this.row : 10
    // ).subscribe(result => {
    //   this.primengTableHelper.totalRecordsCount = result.totalCount;
    //   this.data = {
    //     result: [],
    //     count: 0
    //   };
    //   result.items.forEach(el => {
    //     this.data.result.push({
    //       ...el.employee,
    //       birthdate: `${el.employee.birthdate.year}-${el.employee.birthdate.month}-${el.employee.birthdate.day}`,
    //       check: true
    //     });
    //   });
    //
    //   this.data.count = result.totalCount;
    //   this.primengTableHelper.hideLoadingIndicator();
    // });
  }

  createOrEditEmployee(employeeData: any): void {
    // console.log(employeeData);
    // this.subscription = this._employeeServiceProxy.createOrEdit({ ...employeeData,  }).subscribe();
  }

  deleteEmployee(employee: EmployeeDto): void {
    // this.message.confirm(
    //   '',
    //   this.l('AreYouSure'),
    //   (isConfirmed) => {
    //     if (isConfirmed) {
    //       this._employeeServiceProxy.delete(employee.id)
    //         .subscribe(() => {
    //           this.notify.success(this.l('SuccessfullyDeleted'));
    //         });
    //       this.getEmployee();
    //     }
    //   }
    // );
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeAddressFrom(event: NumberInputEventInterface): void {
    this.minidaddressFilter = event.value;
    this.getEmployee();
  }

  changeAddressTo(event: NumberInputEventInterface): void {
    this.maxidaddressFilter = event.value;
    this.getEmployee();
  }

  changeCompanyFrom(event: NumberInputEventInterface): void {
    this.minidcompanyFilter = event.value;
    this.getEmployee();
  }

  changeCompanyTo(event: NumberInputEventInterface): void {
    this.maxidcompanyFilter = event.value;
    this.getEmployee();
  }

  changePostalAddressFrom(event: NumberInputEventInterface): void {
    this.minidpostaladdressFilter = event.value;
    this.getEmployee();
  }

  changePostalAddressTo(event: NumberInputEventInterface): void {
    this.maxidpostaladdressFilter = event.value;
    this.getEmployee();
  }

  changeUserFrom(event: NumberInputEventInterface): void {
    this.miniduserFilter = event.value;
    this.getEmployee();
  }

  changeUserTo(event: NumberInputEventInterface): void {
    this.maxiduserFilter = event.value;
    this.getEmployee();
  }

  changePayeeFrom(event: NumberInputEventInterface): void {
    this.minpayeeidFilter = event.value;
    this.getEmployee();
  }

  changePayeeTo(event: NumberInputEventInterface): void {
    this.maxpayeeidFilter = event.value;
    this.getEmployee();
  }

  selectGender(event: any): void {
    this.gender = event.itemData.text;
    this.getEmployee();
  }

  changeExternalFrom(event: NumberInputEventInterface): void {
    this.maxexternalidFilter = event.value;
    this.getEmployee();
  }

  changeExternalTo(event: NumberInputEventInterface): void {
    this.minexternalidFilter = event.value;
  }

}
