import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TreeGridOverviewModule} from "./panel2/treeGridOverview.module";
import { UserModule } from './panel3/user.module';
import { HttpClientModule }   from '@angular/common/http';
import { Panel1Module } from './panel1/panel1.module';

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
    HttpClientModule,
    Panel1Module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
