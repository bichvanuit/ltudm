import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.css']
})
export class CheckPaymentComponent implements OnInit {
  info = null;
  location = null;
  cart = null;
  totalPrice = 0;
  transferCost = 0;
  isLoading = true;
  transferMessage = "Bạn được miễn phí giao hàng";

  private objConfig: any;
  private strApiOrder: string;
  private strApiGetOrder: string;
  private strApiGetCard: string;
  private strApiUpdateOrder: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private configUtil: ConfigUtilService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiOrder = this.objConfig[API.R_ORDER];
    this.strApiGetOrder =  this.strApiOrder + this.objConfig[API.ORDER][API.GETORDER];
    this.strApiGetCard = this.strApiOrder + this.objConfig[API.ORDER][API.GETCART];
    this.strApiUpdateOrder = this.strApiOrder + this.objConfig[API.ORDER][API.UPDATE_ORDER];
    
    this.api.getApi(this.strApiGetOrder )
      .then(result => {      
          if(result.status) {
            this.info = result.value.info,
            this.location = result.value.location
          }          
      });

    this.api.getApi( this.strApiGetCard )
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
  payment() {
    this.api.postApi(
      { 'data': { "delivery_method": 1, "payment_method": 1 } }, this.strApiUpdateOrder)
      .then(result => {
        if (result.status) {
          this.router.navigate(['/order-success']);
        }
      });
  }
}
