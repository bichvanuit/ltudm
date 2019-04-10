import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CommonRoutingModule } from './common-routing.module';

import { PageErrorComponent } from './page-error/page-error.component';
import { HomeComponent } from './home/home.component';
import { ActiveAccountComponent } from './active-account/active-account.component';

@NgModule({
    imports: [
        CommonRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        PageErrorComponent,
        HomeComponent,
        ActiveAccountComponent
    ],
    exports: [
    ]
})
export class CommonModule {
   
}