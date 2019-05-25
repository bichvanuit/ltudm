import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_INITIALIZER } from '@angular/core';


import { AppComponent } from './app.component';
import { FooterComponent } from 'src/app/component/common/footer/footer.component';
import { HeaderComponent } from 'src/app/component/common/header/header.component';
import { ApiService } from './service/api.service';
import { ProductService } from './service/product.service';
import { DataSharingService } from './service/dataSharing.service';
import { DataService } from './service/data.service';
import { SettingService } from './service/setting.service';
import { HttpQueryStringService } from './service/httpQueryString.service';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './component/admin/admin.module';
import { CommonModule } from './component/common/common.module';
import { CustomerModule } from './component/customer/customer.module';
import { OrderModule } from './component/order/order.module';
import { ProductModule } from './component/product/product.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ConfigUtilService } from './service/configUtilService';
import { MarketplaceModule } from './component/marketplace/marketplace.module';
import { environment } from 'src/environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    CustomerModule,
    OrderModule,
    ProductModule,
    AdminModule,
    MarketplaceModule
  ],
  providers: [
    ConfigUtilService,
    ApiService, 
    ProductService, 
    DataSharingService, 
    HttpQueryStringService, 
    DataService,
    SettingService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (cf: ConfigUtilService) => function() {return cf.loadConfig(environment.configFile)},
    //   deps: [ConfigUtilService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }