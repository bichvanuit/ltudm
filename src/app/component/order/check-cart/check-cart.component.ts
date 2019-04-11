import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { DataSharingService } from '../../../service/dataSharing.service';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-check-cart',
  templateUrl: './check-cart.component.html',
  styleUrls: ['./check-cart.component.css']
})
export class CheckCartComponent implements OnInit {
  cart = null;
  totalPrice = 0;
  transferCost = 0;
  isLoading = true;
  transferMessage = "Bạn được miễn phí giao hàng";

  tmp = 0;

  private objConfig: any;
  private strApiOrder: string;
  private strApiGetCart: string;
  private strApiUpdateCard: string;

  constructor(
    private api: ApiService,
    private data: DataSharingService,
    private product: ProductService,
    private router: Router,
    private configUtil: ConfigUtilService,
  ) { }

  ngOnInit() {  
    this.objConfig = this.configUtil.getConfig();
    this.strApiOrder = this.objConfig[API.R_ORDER];

    this.strApiGetCart = this.strApiOrder  + this.objConfig[API.ORDER][API.GETCART];  
    this.strApiUpdateCard = this.strApiOrder + this.objConfig[API.ORDER][API.UPDATE_CARD];

    this.api.getApi(this.strApiGetCart)
      .then(result => {
        this.isLoading = false;
        if (result.status) {
          this.cart = result.value.product,
            this.transferCost = result.value.transferCost,
            this.totalPrice = result.value.totalPrice;
          if (this.transferCost > 0) {
            this.transferMessage = "Bạn cần mua thêm " + (200000 - this.totalPrice) + " ₫ để được miễn phí vận chuyển";
          }
        }
      });
  }

  subNum(id) {
    var index = this.cart.findIndex(obj => {
      return obj.id == id;
    });
    if (this.cart[index].num > 1) {
      this.api.postApi(
        { "data": { "product_id": id, "category": this.cart[index], "value": "-1" } }, this.strApiUpdateCard)
        .then(() => {
          this.cart[index].num -= 1;
          this.totalPrice -= this.cart[index].price_sale;         
        });
    }
  }

  plusNum(id) {
    var index = this.cart.findIndex(obj => {
      return obj.id == id;
    });
    this.api.postApi(
      { "data": { "product_id": id, "category": this.cart[index], "value": "1" } }, this.strApiUpdateCard)
      .then(() => {
        this.cart[index].num += 1;
        this.totalPrice += this.cart[index].price_sale;
      });
  }
}
