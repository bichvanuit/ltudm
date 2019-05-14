import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing.module';
import { ListAdminComponent } from './list-admin/list-admin.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
    ListAdminComponent],
    exports: [
    ]
})
export class AdminModule {
   
}