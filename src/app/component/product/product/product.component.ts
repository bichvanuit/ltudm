import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { ProductService } from 'src/app/service/product.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product = null;
  attribute = null;
  keys = null;
  numProduct = 1;
  main_attr = null;
  isLoading = true;
  isLogin = false;
  evaluate = null;
  rating = {
    score: 0,
    precent: [],
  }
  dataProduct = {
    "product_id": 0,
    "category_id": 0,
  }
  isFavorite = false;

  private objConfig: any;
  private strApiGetDetailProduct: string;
  private strApiPostProductView: string;
  private strAPiPostFavorite: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private data: DataSharingService,
    private products: ProductService,
    private configUtil: ConfigUtilService,
  ) { }
  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();

    this.strApiGetDetailProduct = this.objConfig[API.R_PRODUCT] + this.objConfig[API.PRODUCT][API.GET_DETAILS_PRODUCT];
    this.strApiPostProductView = this.objConfig[API.R_PRODUCT] + this.objConfig[API.PRODUCT][API.POST_PRODUCT_VIEW];
    this.strAPiPostFavorite = this.objConfig[API.R_CUSTOMER] + this.objConfig[API.CUSTOMER][API.POST_FAVORITE_PRODUCT];

    window.scrollTo(0, 0);
    this.route.paramMap.subscribe((params: ParamMap) => {
      var url = params.get('url');
      url = url.split("-").slice(-1)[0].slice(1);
      this.api.getApi(SettingService.URL_API_PRODUCT + this.strApiGetDetailProduct + "?categoryId=" + params.get('categoryId') + "&productId=" + url)
        .then(result => {
          this.isLoading = false;
          if (result.status) {
            this.product = result.value.product;
            this.attribute = [JSON.parse(this.product.attribute)];
            this.main_attr = result.value.main_attr;
            this.dataProduct.product_id = this.product.id;
            this.dataProduct.category_id = this.product.category_id;
            this.isFavorite = result.value.favorite;
            if (result.value.evaluate.length > 0) {
              this.evaluate = result.value.evaluate;
              let tmp = this.evaluate.map(item => item.star).reduce((prev, next) => parseInt(prev) + parseInt(next));
              this.rating.score = tmp / this.evaluate.length;
              for (let i = 0; i < 5; i++) {
                this.rating.precent[i] = this.evaluate.filter(item => {
                  return item.star == i + 1;
                });                             
                this.rating.precent[i] =  Math.round(this.rating.precent[i].length / this.evaluate.length * 10000) / 100;
              }                         
            }
          }
        });
    });

    if (localStorage.getItem("MW_TOKEN")) {
      this.isLogin = true;
      this.api.postApi({ "data": this.dataProduct }, this.strApiPostProductView);
    } else {
      this.products.addRecent(this.product.id, this.product.category_id);
    }
  }

  favoriteProduct() {
    if (localStorage.getItem("MW_TOKEN") != null) {
        this.api.postApi({"data" : this.dataProduct}, SettingService.URL_API_CUSTOMER + this.strAPiPostFavorite)
        .then(result => {
          this.isFavorite = !this.isFavorite;
        });
    }
  }

  subNum() {
    if (this.numProduct > 1) {
      this.numProduct -= 1;
    }
  }
  plusNum() {
    this.numProduct += 1;
  }
}
