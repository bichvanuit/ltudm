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
import { ListOrderComponent } from './list-order/list-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';


const routes: Routes = [
    { path : 'order', component : ListOrderComponent},
    { path : 'order/:id', component : DetailOrderComponent},
];

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})

export class OrderRoutingModule {

}