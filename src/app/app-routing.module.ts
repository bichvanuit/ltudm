import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HomeComponent } from './component/common/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routesConfig : Routes = [
//  { path : '**', component : HomeComponent},
//  { path : '', redirectTo: '/index', pathMatch: 'full'},
];

  @NgModule({
    imports:  [
      RouterModule.forRoot(routesConfig),
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      InfiniteScrollModule,
    ],
    declarations:[
    ],
    exports: [
      RouterModule
    ],
  })
  export class AppRoutingModule{}