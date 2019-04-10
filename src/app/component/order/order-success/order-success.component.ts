import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { DataSharingService } from '../../../service/dataSharing.service';
import { SettingService } from 'src/app/service/setting.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  info = null;
  isLoading = true;
  constructor(
    private api: ApiService,
    private data : DataSharingService,
  ) { }
  ngOnInit() {
    this.api.getApi(SettingService.URL_API_ORDER + "/get-order-success")
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
