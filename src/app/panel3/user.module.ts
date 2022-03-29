import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxModule, SliderModule } from '@syncfusion/ej2-angular-inputs';
import { UserService } from '../service/user.service';

@NgModule({
  imports: [
    GridAllModule,
    DropDownListAllModule,
    DropDownListModule,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModule,
    DateRangePickerModule,
    NumericTextBoxModule,
    SliderModule

  ],
  exports: [UserComponent],
  providers: [UserService],
  declarations: [UserComponent],
})
export class UserModule {}
