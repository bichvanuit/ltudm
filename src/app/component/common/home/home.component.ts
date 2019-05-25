import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = {
    "hot" : [],
    "new" : [],
    "recent" : [],
  };

  private objConfig: any;
  private strApiProductHot: string;
  private strApiProductNew: string;
  private strApiProductRecent: string;

  constructor(
    private api : ApiService, 
    private product : ProductService,
    private router : Router,
    private configUtil: ConfigUtilService,
  ){ } 
  ngOnInit() {  
  
    // this.objConfig = this.configUtil.getConfig();
    // this.strApiProductHot = this.objConfig[API.R_PRODUCT] + this.objConfig[API.PRODUCT][API.PRODUCT_HOT];
    // this.strApiProductNew = this.objConfig[API.R_PRODUCT] + this.objConfig[API.PRODUCT][API.PRODUCT_NEW];
    // this.strApiProductNew = this.objConfig[API.R_PRODUCT] + this.objConfig[API.PRODUCT][API.PRODUCT_RECENT];
    
    this.api.getApi(this.strApiProductHot)
    .then(result => { this.products["hot"] = result.value });

    this.api.getApi(this.strApiProductNew)
    .then(result => {this.products["new"] = result.value });  

 this.products["recent"] = [];
    this.api.getApi(this.strApiProductRecent  + JSON.stringify({'data' : localStorage.getItem("MW_RECENT")}))
    .then(result => {
      if(result.status) {
        this.products["recent"] = result.value;
      }
     });  
  }

  productHandle(type, id){
    let product_id = this.products[type][id].id, category_id =  this.products[type][id].category_id;
    this.product.addRecent(product_id,  category_id);
    this.router.navigate(['/product/' + category_id + this.products[type][id].url_product]);
  }

  redirect(link) {
    this.router.navigate([link]);
  }
}
