/**********************************************************************************
 * 
 *                      DO AN CHUYEN NGANH (NT114.J21)
 *              ------------------------------------------
 *      File name: common-routing.module.ts
 *      Create by: 15521000_van-ltb
 *      Modify by: 15521000_van-ltb
 * 
 **********************************************************************************/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageErrorComponent } from './page-error/page-error.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: 'test', component: PageErrorComponent },
    { path : '', component : HomeComponent },
];

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})

export class CommonRoutingModule {

}