import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataSharingService } from '../../../service/dataSharing.service';
import { SettingService } from 'src/app/service/setting.service';

@Component({
  selector: 'app-check-shipping',
  templateUrl: './check-shipping.component.html',
  styleUrls: ['./check-shipping.component.css']
})
export class CheckShippingComponent implements OnInit {
  formInfo: FormGroup;
  provinces = null;
  districts = null;
  communes = null;
  cart = null;
  totalPrice = 0;
  transferCost = 0;
  isLoading = true;
  numProduct = 0;
  transferMessage = "Bạn được miễn phí giao hàng";

  constructor(private api: ApiService, private router: Router, private data: DataSharingService) { }

  ngOnInit() {
    this.api.getApi(SettingService.URL_API_LOCATION + "/get-location")
      .then(result => this.provinces = result.value);

    this.api.getApi(SettingService.URL_API_LOCATION + "/get-location?province_id=1")
      .then(result => this.districts = result.value);

    this.api.getApi(SettingService.URL_API_LOCATION + "/get-location?province_id=1&district_id=1")
      .then(result => this.communes = result.value);

    this.api.getApi(SettingService.URL_API_CUSTOMER + "/get-user")
      .then(result => {
        if (result.status) {
          let data = result.value;
          this.formInfo = new FormGroup({
            fullname: new FormControl(data.fullname, [Validators.required]),
            email: new FormControl(data.username, [Validators.required, Validators.email]),
            phone_number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
            apartment_street_number: new FormControl('', [Validators.required]),
            province: new FormControl(1),
            district: new FormControl(1),
            commune: new FormControl(1),
            invoice: new FormControl(false),
            note: new FormControl(''),
          });
        }
      });

    this.api.getApi(SettingService.URL_API_ORDER + "/get-cart")
      .then(result => {
        this.isLoading = false;
        if (result.status) {
          this.cart = result.value.product,
            this.transferCost = result.value.transferCost,
            this.totalPrice = result.value.totalPrice;
          this.numProduct = this.cart.length;
          if (this.transferCost > 0) {
            this.transferMessage = "Bạn cần mua thêm " + (200000 - this.totalPrice) + " ₫ để được miễn phí vận chuyển";
          }
        }
      });
  }

  postOrder() {
    this.api.postApi({ 'data': this.formInfo.value }, SettingService.URL_API_ORDER + "/post-order")
      .then(result => {
        this.router.navigate(['/check-payment']);
      });
  }
}
