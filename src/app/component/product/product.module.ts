import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ProductRoutingModule } from './product-routing.module';

import { EvaluateComponent } from './evaluate/evaluate.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { SeeMoreProductComponent } from './see-more-product/see-more-product.component';

import { KeysPipe } from 'src/app/pipe/keys.pipe';
import { AttributePipe } from 'src/app/pipe/attribute.pipe';
import { CategoryPipe } from 'src/app/pipe/category.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        InfiniteScrollModule
    ],
    declarations: [
        EvaluateComponent,
        SearchComponent,
        SeeMoreProductComponent,
        ProductComponent,
        KeysPipe,
        AttributePipe,
        CategoryPipe
    ],
    exports: [
    ]
})
export class ProductModule {
   
}