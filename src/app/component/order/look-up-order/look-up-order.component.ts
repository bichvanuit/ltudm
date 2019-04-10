import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { SettingService } from 'src/app/service/setting.service';

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
  constructor(private api : ApiService) { }

  ngOnInit() {
    
  }

  lookUp(){
    this.api.postApi({"data" : this.order}, SettingService.URL_API_ORDER + "/look-up-order")
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
