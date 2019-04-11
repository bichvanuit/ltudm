import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-look-up-order',
  templateUrl: './look-up-order.component.html',
  styleUrls: ['./look-up-order.component.css']
})
export class LookUpOrderComponent implements OnInit {
  order = {
    id: '',
    phone_number: '',
  }
  data = null;
  isFind=false;
  status = false;

  private objConfig: any;
  private strApiLookUpOrder: string;

  constructor(
    private api : ApiService,
    private configUtil: ConfigUtilService,
  ) { }

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiLookUpOrder = this.objConfig[API.R_ORDER] + this.objConfig[API.ORDER][API.LOOK_UP_ORDER]
  }

  lookUp(){
    this.api.postApi({"data" : this.order}, this.strApiLookUpOrder)
    .then(result => {
      if(result.status){
        this.data = result.value;
        this.isFind = true;
      } else {
        this.status = true;
      }
    });
  }
}
