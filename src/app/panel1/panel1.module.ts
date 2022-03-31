import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Panel1Component } from './panel1/panel1.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Panel1Component
  ],
  exports: [Panel1Component],
  imports: [
    CommonModule,
    GridModule,
    TreeGridAllModule,
    ReactiveFormsModule
  ]
})
export class Panel1Module { }
