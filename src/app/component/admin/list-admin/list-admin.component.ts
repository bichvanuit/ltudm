import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {

  public users = [];

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.getApi("http://localhost:1337/admin/account/get-all-user")
        .then(result => {
          this.users = result.value;
        });
  }

}
