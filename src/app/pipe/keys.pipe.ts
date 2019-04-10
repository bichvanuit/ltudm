import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let k in value){
            var tmp = value[k];
            for(let m in tmp) {
                keys.push({key: m, value: tmp[m]});
            }  
        }
        return keys;
    }
}
