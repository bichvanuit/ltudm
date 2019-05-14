import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-marketplace',
  templateUrl: './list-marketplace.component.html',
  styleUrls: ['./list-marketplace.component.css']
})
export class ListMarketplaceComponent implements OnInit {

  public marketplaces = [];

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.getApi("http://localhost:1337/admin/marketplace/get-all-marketplace")
        .then(result => {
          this.marketplaces = result.value;
        });
  }

}
