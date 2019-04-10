import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';

import { CheckCartComponent } from './check-cart/check-cart.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { CheckShippingComponent } from './check-shipping/check-shipping.component';
import { LookUpOrderComponent } from './look-up-order/look-up-order.component';
import { OrderComponent } from './order/order.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

@NgModule({
    imports: [
        OrderRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        CheckCartComponent,
        CheckPaymentComponent,
        CheckShippingComponent,
        LookUpOrderComponent,
        OrderComponent,
        OrderSuccessComponent
    ],
    exports: [
    ]
})
export class OrderModule {
   
}