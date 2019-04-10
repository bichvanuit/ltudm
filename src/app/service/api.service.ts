import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ApiService implements OnInit {
    constructor(private http:Http){   
    }

    ngOnInit() {
    }

    getApi(url){  
        let header = new Headers({'Content-Type' : 'application/json' });
        if(localStorage.getItem("MW_TOKEN") != null) {            
            header.append("authorization", "Bearer " + localStorage.getItem("MW_TOKEN"));              
        }     
        return this.http.get(url, {"headers" : header})
        .toPromise()
        .then(res => res.json())
        .then(resJson => resJson);
    }
    
    postApi(value, url){               
        const body = JSON.stringify(value);
        let header = new Headers({'Content-Type' : 'application/json' });
        if(localStorage.getItem("MW_TOKEN") != null) {            
            header.append("authorization", "Bearer " + localStorage.getItem("MW_TOKEN"));              
        } 
        return this.http.post(url, body, {"headers" : header})
        .toPromise()
        .then(res => res.json())
        .then(resJson => resJson);
    }
}