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
        return this.http.get(url)
        .toPromise()
        .then(res => res.json())
        .then(resJson => resJson);
    }

    getApiInstance(url, id){  
        return this.http.get(url + id)
        .toPromise()
        .then(res => res.json())
        .then(resJson => resJson);
    }
    
    postApi(value, url){               
        const body = JSON.stringify(value);

        return this.http.post(url, body)
        .toPromise()
        .then(res => res.json())
        .then(resJson => resJson);
    }
}