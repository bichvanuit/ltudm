import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {

  private objConfig: any;
  private strApiActive: string;

  constructor( 
    private route : ActivatedRoute, 
    private api : ApiService, 
    private router : Router,
    private configUtil: ConfigUtilService,
  ) { }

  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiActive = this.objConfig[API.R_CUSTOMER] + this.objConfig[API.CUSTOMER][API.ACTIVEACCOUNT];
    
    let token = this.route.snapshot.paramMap.get('token');
    this.api.postApi({"data" : token}, this.strApiActive)
    .then(result => {
      if(result.status) {
        localStorage.setItem("MW_TOKEN", result.value.token);
        this.router.navigate(['/customer']);
      }      
    });
  }
}
