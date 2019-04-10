import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'category'})
export class CategoryPipe implements PipeTransform {
    transform(value, args:string[]) : any {        
        let tmp = value == "1" ? "Điện thoại" : value == "2" ? "Laptop" : "Máy ảnh";
        return tmp; 
    }
}
