import { Injectable } from '@angular/core';

@Injectable()

export class HttpQueryStringService{
    httpQueryString(filter: string[]) : string{       
        let result = '';
        filter = filter.map(item => {
            return item["key"] + "=" + item["value"];
        }); 
        return filter.join("&");
    }
}