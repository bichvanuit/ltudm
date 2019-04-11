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

import { SearchComponent } from 'src/app/component/product/search/search.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { SeeMoreProductComponent } from 'src/app/component/product/see-more-product/see-more-product.component';
import { EvaluateComponent } from 'src/app/component/product/evaluate/evaluate.component';

const routes: Routes = [
    { path : 'search/:q', component : SearchComponent},
    { path : 'product/:categoryId/:url', component : ProductComponent},
    { path : 'product', component : SeeMoreProductComponent},
    { path : 'evaluate/:id/:url', component : EvaluateComponent},
];

@NgModule({
    imports : [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ]
})

export class ProductRoutingModule {

}