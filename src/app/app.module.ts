import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import {RouterModule, Routes} from '@angular/router';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { HttpModule } from '@angular/http';
import { HomepageComponent } from './homepage/homepage.component';
import { BinManagementComponent } from './bin-management/bin-management.component';
import { OnlyNumber } from './directives/only-number.directive';
import { TruckManagementComponent } from './truck-management/truck-management.component';
import { EfficientAllocationComponent } from './efficient-allocation/efficient-allocation.component';



let routes = 
[
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'test2', component: Test2Component },
  { path: 'homepage', component: HomepageComponent },
  { path: 'bin', component: BinManagementComponent}, 
  { path: 'truck', component: TruckManagementComponent},
  { path: 'efficientAllocation', component: EfficientAllocationComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    TestComponent,
    Test2Component,
    HomepageComponent,
    BinManagementComponent,
    OnlyNumber,
    TruckManagementComponent,
    EfficientAllocationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
