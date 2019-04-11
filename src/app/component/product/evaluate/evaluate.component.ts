import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../../../service/setting.service';
import { from } from 'rxjs';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  product = null;
  isLoading = true;

  private objConfig: any;
  private strApiGetProductEvaluate: string;

  constructor(
    private api : ApiService, 
    private route : ActivatedRoute,
    private configUtil: ConfigUtilService,
  ) { }  
  ngOnInit() {

    this.objConfig = this.configUtil.getConfig();
    this.strApiGetProductEvaluate = this.objConfig[API.R_CUSTOMER] + this.objConfig[API.CUSTOMER][API.GET_PRODUCT_EVALUATE];
    let url = this.route.snapshot.paramMap.get('url');
    url = url.split("-").slice(-1)[0].slice(1); 
    this.api.getApi(SettingService.URL_API_CUSTOMER + this.strApiGetProductEvaluate +"?order_id=" + this.route.snapshot.paramMap.get('id') + "&product_id=" + url)
    .then(result => {
        this.product = result.value;
        this.isLoading = false;
    });
  }

}
