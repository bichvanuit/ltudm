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


const routes: Routes = [
];

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})

export class InfoRoutingModule {

}