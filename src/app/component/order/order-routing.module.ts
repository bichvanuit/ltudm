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

import { CheckCartComponent } from './check-cart/check-cart.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { CheckShippingComponent } from './check-shipping/check-shipping.component';
import { LookUpOrderComponent } from './look-up-order/look-up-order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
    { path : 'check-cart', component : CheckCartComponent},
    { path : 'check-shipping', component : CheckShippingComponent},
    { path : 'check-payment', component : CheckPaymentComponent},
    { path : 'look-up-order', component : LookUpOrderComponent},
    { path : 'order-success', component : OrderSuccessComponent},
    { path : 'order-detail/:id', component : OrderComponent},
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