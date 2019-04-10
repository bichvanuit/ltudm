import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { SettingService } from 'src/app/service/setting.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order = null;
  products = null;
  location = null;
  isLoading = true;
  constructor(
    private api : ApiService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.api.getApi(SettingService.URL_API_ORDER + "/get-order-detail/" + this.route.snapshot.paramMap.get('id'))
    .then(result => {
      this.isLoading = false;
      if(result.status) {
        this.order = result.value.order;
        this.products = result.value.product;
        this.location = result.value.location;
      }
    });
  }
}
