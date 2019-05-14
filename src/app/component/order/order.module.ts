import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';

@NgModule({
    imports: [
        OrderRoutingModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
    ListOrderComponent,
    DetailOrderComponent],
    exports: [
    ]
})
export class OrderModule {
   
}