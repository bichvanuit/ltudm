import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

declare var $: any;
@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit, AfterViewInit {

  public orders = [];

  constructor(private apiService : ApiService) { 

  }

  ngOnInit() {
    this.apiService.getApi("http://localhost:1337/admin/order/get-all-order")
        .then(result => {
          this.orders = result.value[0];
        });

  }

  ngAfterViewInit(){
    setTimeout(function(){
        $('#example2').DataTable({
          'paging': true,
          'lengthChange': true,
          'searching': true,
          'ordering': true,
          'info': true,
          'autoWidth': true
        });
    }, 1000);
    
  }

}
