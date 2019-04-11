import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ProductService } from 'src/app/service/product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  q = null; products = null; filters = null; keys = null; fiterchosen = []; totalProduct = 0; isLoading = true; showFilter = [];
  page = 1;
  throttle = 300;
  scrollDistance = 1;
  path = this.location.path();
  isFished = false;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    private router: Router,
    private product: ProductService,
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
    this.q = this.route.snapshot.paramMap.get('q');
    this.fiterchosen = this.product.getFilterChosen(this.path);
    this.api.getApi(SettingService.URL_API_PRODUCT + this.path)
      .then(result => {
        this.isLoading = false;
        if (result.status) {
          this.products = result.value.product;
          this.filters = result.value.filter;
          this.keys = Object.keys(this.filters);
          this.keys = this.keys.filter(item => {
            let i = this.fiterchosen.findIndex(obj => {
              return obj[item] !== undefined;
            });
            this.showFilter[item] = false;
            return i == -1;
          });
          this.totalProduct = result.value.total;
        }
      });
  }

  productHandle(id) {
    this.router.navigate(['/product/' + this.products[id].category_id + this.products[id].url_product]);
  }

  mouseEnter(key) {
    this.showFilter[key] = true;
  }

  mouseLeave(key) {
    this.showFilter[key] = false;
  }

  filter(key, value, flag) {
    this.page = 1;
    this.isFished = false;
    if (flag) {
      this.fiterchosen.push({ [key]: value });
    } else {
      let index = this.fiterchosen.findIndex(obj => {
        return obj[key] !== undefined;
      });
      this.fiterchosen.splice(index, 1);
    }
    let objFilter = new Object();
    this.fiterchosen.map(item => {
      objFilter[Object.keys(item)[0]] = Object.values(item)[0];
    });
    this.router.navigate(['/search/' + this.q], { queryParams: objFilter });
  }

  onScrollDown() {
    this.page += 1;
    if (this.page * 20 > this.totalProduct) {
      this.isFished = true;
    }
    let link = SettingService.URL_API_PRODUCT + this.path;
    if (link.indexOf("?") > -1) {
      link += "&page=" + this.page;
    } else {
      link += "?page=" + this.page;
    }
    this.api.getApi(link)
      .then(result => {
        this.products = this.products.concat(result.value.product);
      });
  }
}
