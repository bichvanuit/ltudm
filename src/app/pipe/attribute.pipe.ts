import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name : 'formatAttr' })

export class AttributePipe implements PipeTransform{
    transform(value : string) : string {
        const attribute = {
            "manufacturer":"Thương hiệu",
            "origin":"Nước sản xuất",
            "camera":"Camera",
            "resolution":"Độ phân giải",
            "chip":"Chip",
            "graphic_card":"Card màn hình",
            "operating_system":"Hệ điều hành",
            "screen_size":"Màn hình",
            "front_camera":"Camera trước",
            "after_camera":"Camere sau",
            "RAM":"RAM",
            "ROM":"ROM",			
        };
        return attribute[value];
    }

}