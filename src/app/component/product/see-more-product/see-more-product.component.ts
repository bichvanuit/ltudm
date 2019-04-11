import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ApiService } from 'src/app/service/api.service'; 
import { ProductService } from 'src/app/service/product.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-see-more-product',
  templateUrl: './see-more-product.component.html',
  styleUrls: ['./see-more-product.component.css']
})
export class SeeMoreProductComponent implements OnInit {

  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  page = 1;
  products = null;
  src = null;
  isFinshed = false;
  titleCurrent = '';
  link = null;

  private objConfig: any;
  private strApiProduct: string;
  private strApiProductHot: string;
  private strApiProductRecent: string;
  private strApiProductNew: string;

  constructor(
    private router : ActivatedRoute,
    private api : ApiService,
    private route : Router,
    private productService : ProductService,
    private configUtil: ConfigUtilService,
    ) {}

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiProduct = this.objConfig[API.R_PRODUCT];
    this.strApiProductHot = this.strApiProduct + this.objConfig[API.PRODUCT][API.PRODUCT_HOT];
    this.strApiProductNew = this.strApiProductNew + this.objConfig[API.PRODUCT][API.PRODUCT_NEW];
    this.strApiProductRecent = this.strApiProductRecent + this.objConfig[API.PRODUCT][API.PRODUCT_RECENT];

    this.router.queryParams.subscribe((params: Params) => {
      this.src = params.src;
      switch(this.src) {
        case 'product-hot':
            this.link =  this.strApiProductHot;      
            this.titleCurrent = "Sản phẩm được xem nhiều";
            break;
        case 'product-viewed':
          this.link = this.strApiProductNew;
          this.titleCurrent = "Sản phẩm đã xem";
          this.isFinshed = true;
          break;
        case 'product-new':
          this.link = this.strApiProductRecent;
          this.titleCurrent = "Hàng mới về"
          break;
      }
      this.api.getApi(this.link + "?page=1")
      .then(result => {
        console.log(result);
        this.products = result.value
      });      
    });
  }

  onScrollDown () {  
    console.log(this.page);
    this.page += 1;
    this.isFinshed = false;
    this.api.getApi(this.link + "?page=" + this.page)
    .then(result => { 
      if(!result.status) {
        this.isFinshed = false;
        return;
      }    
      this.isFinshed = true; 
      this.products = this.products.concat(result.value);          
    });
  }

  productHandle(id){
    this.productService.addRecent(this.products[id].id, this.products[id].category_id); 
    this.route.navigate(['/product/' + this.products[id].category_id + this.products[id].url_product]);
  }
}
