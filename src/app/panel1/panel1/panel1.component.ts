import { Component, OnInit } from '@angular/core';
import {
  VirtualScrollService,
  FilterService,
  ToolbarService, PageService, EditService, SaveEventArgs,EditSettingsModel, FilterSettingsModel, ToolbarItems
} from '@syncfusion/ej2-angular-grids';
import { sampleData } from './datasource';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel1',
  templateUrl: './panel1.component.html',
  styleUrls: ['./panel1.component.css'],
  providers: [FilterService, VirtualScrollService, ToolbarService, EditService, PageService]
})

export class Panel1Component implements OnInit {

  public data: Object[];
  initialPage: any;
  editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public pageSettings: Object;
  public filterOptions: FilterSettingsModel;
  mainForm: FormGroup;
  submitClicked = false;
  constructor( private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
    // this.data = sampleData;
    this.filterOptions = {
      type: 'Menu'
    };
    this.initialPage = { pageSizes: [10, 25, 50, 100, 500], pageCount: 3, pageSize: 10, enableQueryString: false };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.pageSettings = { pageSize: 10 };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }

  getUsers(){
    this.userService.getUsers().subscribe((data) => {
      this.data = data
      console.log(data)}
    )
  }

  createFormGroup(data: any): FormGroup {
    return new FormGroup({
      password: new FormControl(data.password),
      username: new FormControl(data.username),
      email: new FormControl(data.email),
      city: new FormControl(data.city),
      country: new FormControl(data.country),
      year: new FormControl(data.firstname),
    });
  }

  actionBegin(args: SaveEventArgs | any): void {
    if (args.requestType === 'add' || args.requestType === 'beginEdit') {
      // this.submitClicked = false;
      // this.updateId = args.rowData.id ? args.rowData.id : 0;
      // this.mainForm = this.createFormGroup(args.rowData);
      this.mainForm = this.createFormGroup(args.rowData);
      // this.data = [args,...this.data]
      // this.userService.createUser(args.rowData)
      console.log("add", this.mainForm.getRawValue());
    }

    if (args.requestType === 'save') {
      console.log("save", {...args.data });
      // this.createOrEditEmployee({...args.data });
      // this.getUsers();
    }

    if (args.currentPage !== args.previousPage) {
      // this.first = (args.currentPage - 1) * 10;
      // this.getUsers();
      console.log("currentPage" , args.rowData);
    }

    if (args.requestType === 'delete') {
      console.log(" drop  args.data[0]", args.data[0]._id )
       this.userService.deleteUser(args.data[0]._id);
      // this.getUsers();
      console.log(args.rowData);
    }
  }

}
