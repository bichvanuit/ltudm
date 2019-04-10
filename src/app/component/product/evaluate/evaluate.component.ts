import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../../../service/setting.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateComponent implements OnInit {

  product = null;
  isLoading = true;
  constructor(private api : ApiService, private route : ActivatedRoute) { }  
  ngOnInit() {
    let url = this.route.snapshot.paramMap.get('url');
    url = url.split("-").slice(-1)[0].slice(1); 
    this.api.getApi(SettingService.URL_API_CUSTOMER + "/get-product-evaluate?order_id=" + this.route.snapshot.paramMap.get('id') + "&product_id=" + url)
    .then(result => {
        this.product = result.value;
        this.isLoading = false;
    });
  }

}
