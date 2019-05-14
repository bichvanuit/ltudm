import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CustomerRoutingModule } from './customer-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
    ],
    declarations: [
        ListCustomerComponent
    ],
    exports: [
    ]
})
export class CustomerModule {
   
}