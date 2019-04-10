import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routesConfig : Routes = [
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