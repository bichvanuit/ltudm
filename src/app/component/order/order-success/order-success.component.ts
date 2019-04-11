import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { DataSharingService } from '../../../service/dataSharing.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  info = null;
  isLoading = true;

  private objConfig: any;
  private strApiGetOrderSuccess: string;

  constructor(
    private api: ApiService,
    private data : DataSharingService,
    private configUtil: ConfigUtilService,
  ) { }
  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiGetOrderSuccess = this.objConfig[API.R_ORDER] + this.objConfig[API.ORDER][API.GET_ORDER_SUCCESS];
    this.api.getApi(this.strApiGetOrderSuccess)
      .then(result => {
        this.isLoading = false
        if(result.status) {
          this.data.addToCart.next(0);
          this.info = result.value.info;
          this.info.create_at = parseInt(this.info.create_at) + 3 * 24 * 60 * 60 * 1000;
        }    
      });
  }
}
