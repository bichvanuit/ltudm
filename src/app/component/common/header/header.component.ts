import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/service/dataSharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingService } from 'src/app/service/setting.service';
import { ConfigUtilService } from 'src/app/service/configUtilService';
import { API } from 'src/assets/contants/contants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(
    ) {  
  }

  ngOnInit() {
  
  }
}
