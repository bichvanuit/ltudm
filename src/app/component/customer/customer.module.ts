import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
    ],
    declarations: [
        CustomerComponent
    ],
    exports: [
    ]
})
export class CustomerModule {
   
}