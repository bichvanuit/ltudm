import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  public orders = [];

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.getApi("http://localhost:1337/admin/order/get-all-order")
        .then(result => {
          this.orders = result.value[0];
        });
        console.log(this.orders);
  }

}
