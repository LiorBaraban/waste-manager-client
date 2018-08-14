import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import {RouterModule, Routes} from '@angular/router';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { HttpModule } from '@angular/http';



let routes = 
[
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test2', component: Test2Component },
]


@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    TestComponent,
    Test2Component
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
