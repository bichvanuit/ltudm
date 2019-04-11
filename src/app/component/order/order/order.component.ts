import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

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

  private objConfig: any;
  private strApiGetOrder: string;

  constructor(
    private api : ApiService,
    private route : ActivatedRoute,
    private configUtil: ConfigUtilService,
  ) { }

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiGetOrder = this.objConfig[API.R_ORDER] + this.objConfig[API.ORDER][API.GET_ORDER_DETAIL] + "/";
    this.api.getApi(SettingService.URL_API_ORDER + this.strApiGetOrder + this.route.snapshot.paramMap.get('id'))
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
