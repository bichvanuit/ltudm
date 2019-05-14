import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  public customers = [];

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.getApi("http://localhost:1337/admin/customer/get-all-customer")
        .then(result => {
          this.customers = result.value;
        });
  }

}
