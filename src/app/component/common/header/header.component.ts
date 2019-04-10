import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  q = null;
  numProduct = 0;
  cart = null;
  totalPrice = 0;
  isShow = true;
  isLogin = true;
  isLogined = false;
  isEmpty = false;
  formLogin: FormGroup;
  formRegister: FormGroup;
  errorLogin = null;
  errorRegister = null;
  user = "Tài khoản đăng nhập";
  active = [true, false, false];

  onSubmit() {
    this.route.routeReuseStrategy.shouldReuseRoute = function () { return false; };
    let currentUrl = this.route.url + '?';
    this.route.navigateByUrl(currentUrl)
      .then(() => {
        this.route.navigated = false;
        this.route.navigate(['/search/' + this.q]);
      });
  }

  private objConfig: any;
  private strApiGetUser: string;
  private strApiGetCart: string;

  constructor(
    private route: Router,
    private api: ApiService,
    private location: Location,
    private data: DataSharingService,
    private configUtil: ConfigUtilService,
    ) {  

    this.data.addToCart.subscribe(value => {
      this.numProduct = value;
    });

    this.data.isLogin.subscribe(value => {
      this.user = value;
      if (value != "Tài khoản đăng nhập") {
        this.isLogined = true;
      }
    });
  }

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiGetCart = this.objConfig["ORDER"] + this.objConfig["GetCart"];
    this.strApiGetUser = this.objConfig["CUSTOMER"] + this.objConfig["GetUser"]; 
    
    this.data.addToCart.subscribe(value => {
      this.numProduct += value;
    });

    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    });

    this.api.getApi(this.strApiGetCart)
      .then(result => {
        if (result.status) {
          this.numProduct = result.value.product.map(item => item.num).reduce((prev, next) => parseInt(prev) + parseInt(next));
        }
      });

    this.api.getApi(this.strApiGetUser)
      .then(result => {
        if (result.status) {
          this.user = result.value.fullname;
          this.isLogined = true;
        } else {
          localStorage.removeItem("MW_TOKEN");
        }
      });
  }


  getCart() {
    this.api.getApi(this.strApiGetCart)
      .then(result => {
        if(result.status) {
          this.cart = result.value.product;
          this.totalPrice = result.value.totalPrice;
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }      
      });
  }

  change(index) {
    this.active = [false, false, false];
    this.active[index] = true;
  }
}
