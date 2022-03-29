import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TreeGridOverviewModule} from "./panel2/treeGridOverview.module";
import { UserModule } from './panel3/user.module';
import { HttpClientModule }   from '@angular/common/http';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeGridOverviewModule,
    UserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
