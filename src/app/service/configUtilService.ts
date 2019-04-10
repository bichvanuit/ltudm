import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()

export class ConfigUtilService {
    private objConfig: any;
    constructor(
        private http:Http
    ) { }
    public loadConfig(url: string) {
        return this.http.get(url)
        .toPromise()
        .then(res => res.json())
        .then(resJson => this.objConfig = resJson);
    }
    public getConfig() {
        return this.objConfig;
    }
}