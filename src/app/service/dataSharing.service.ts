import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class DataSharingService{   
    public addToCart : BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public isLogin : BehaviorSubject<string> = new BehaviorSubject<string>("Tài khoản đăng nhập");
    public isShowLogin : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}