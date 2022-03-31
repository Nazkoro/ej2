import { Component, OnInit } from '@angular/core';
import {
  VirtualScrollService,
  FilterService,
  ToolbarService, PageService, EditService, EditSettingsModel, FilterSettingsModel, ToolbarItems
} from '@syncfusion/ej2-angular-grids';
import { sampleData } from './datasource';

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

  ngOnInit(): void {
    this.data = sampleData;
    this.filterOptions = {
      type: 'Menu'
    };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.pageSettings = { pageSize: 10 };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  }
}
