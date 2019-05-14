import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { ListMarketplaceComponent } from './list-marketplace/list-marketplace.component';

@NgModule({
    imports: [
        MarketplaceRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
    ListMarketplaceComponent],
    exports: [
    ]
})
export class MarketplaceModule {
   
}