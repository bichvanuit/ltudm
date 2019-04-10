import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InfoRoutingModule } from './info-routing.module';
import { OrderGuideComponent } from './order-guide/order-guide.component';

@NgModule({
    imports: [
        InfoRoutingModule,
        BrowserModule,
        FormsModule
    ],
    declarations: [
        OrderGuideComponent
    ],
    exports: [
    ]
})
export class InfoModule {
   
}