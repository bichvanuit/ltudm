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
import { ListMarketplaceComponent } from './list-marketplace/list-marketplace.component';



const routes: Routes = [
    { path : 'marketplace', component : ListMarketplaceComponent},
];

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})

export class MarketplaceRoutingModule {

}