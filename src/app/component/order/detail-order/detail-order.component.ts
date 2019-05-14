import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  order = null;
  products = null;
  location = null;

  constructor(
    private apiService : ApiService,
    private route: ActivatedRoute,
    // private location: Location
    ) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getApiInstance("http://localhost:1337/admin/order/get-detail-order/", id)
        .then(result => {
        this.order = result.value.order;
        this.products = result.value.product;
        this.location = result.value.location;
        });
  }

  // goBack(): void {
  //   this.location.back();
  // }
}
