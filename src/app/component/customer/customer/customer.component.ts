import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  formInfo: FormGroup;
  active = [true, false, false, false, false];
  info = null;
  products = {
    viewed : [],
    order : [],
    purchased : [],
  }
  isMale = null;
  isFinish = false;
  statusUpdate = null;
  isSuccess = null;
  social = {
    face : false,
    google : false,
    local : false,
  };

  private objConfig: any;
  private strApiCustomer: string;
  private strApiGetUser: string;
  private strApiGetOrder: string;
  private strApiGetViewProduct: string;
  private strApiUpdateProfile: string;

  constructor(
    private api : ApiService,
    private configUtil: ConfigUtilService,
  ) { }
  ngOnInit() {
    this.objConfig = this.configUtil.getConfig();
    this.strApiCustomer = this.objConfig[API.R_CUSTOMER];

    this.strApiGetUser = this.strApiCustomer + this.objConfig[API.CUSTOMER][API.GETUSER];
    this.strApiGetOrder = this.strApiCustomer + this.objConfig[API.CUSTOMER][API.GETORDER];
    this.strApiGetViewProduct = this.strApiCustomer + this.objConfig[API.CUSTOMER][API.GET_VIEW_PRODUCT];
    this.strApiUpdateProfile = this.strApiCustomer + this.objConfig[API.CUSTOMER][API.UPDATE_PROFILE];

      this.api.getApi(this.strApiGetUser)
      .then(result => {     
        if(result.status) {
          let data = result.value;  
          this.isMale = data.sex == 0 ? false : true;   
          this.formInfo = new FormGroup({
            fullname: new FormControl(data.fullname, [Validators.required]),
            username: new FormControl(data.username),
            sex: new FormControl(data.sex),          
            day: new FormControl(data.day),
            month : new FormControl(data.month),
            year : new FormControl(data.year),
            old_password : new FormControl(''),
            new_password : new FormControl(''),
            confirm_password : new FormControl(''),
          });
          let tmp = data.type.split(",");
          tmp.map(item => {
            if(item == "0") this.social.local = true;
            else if(item == "1") this.social.face = true;
            else if(item == "2") this.social.google = true;
          });
        } else {
          this.formInfo = null;
        }    
      });  
  }

  show(index){
    var i = this.active.findIndex(obj =>{ 	
      return obj == true;
    });	
    this.active[i]= false;
    this.active[index]= true; 
    this.isFinish = false;
    switch(index) {
      case 0:
        break;
      case 1:
        this.api.getApi(this.strApiGetOrder)
        .then(result => {
          this.products.order = result.value;
        });
        break;
      case 2:
        this.api.getApi(this.strApiGetViewProduct)
        .then(result => {
          this.products.viewed = result.value;        
        });
        break;      
      case 3:
        break;
      case 4:
        break;
    } 
    this.isFinish = true; 
  }

  updateProfile() {
    this.api.postApi({'data' : this.formInfo.value}, this.strApiUpdateProfile)
    .then(result => {
      if(result.status) {
        this.isSuccess = true;
        this.statusUpdate = 'Thông tin tài khoản của bạn đã được cập nhật';
      } else {
        this.isSuccess = false;
        this.statusUpdate = result.message;
      }
    });
  }
}
