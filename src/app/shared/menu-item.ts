import { Injectable } from "@angular/core";

export interface Menu{
    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
}

const MENUITEM = [
    {state:'dashboard', name:'Dashboard',type:'link',icon:'dashboard',role:''},
    {state:'category', name:'Danh mục sản phẩm',type:'link',icon:'category',role:'admin'},
    {state:'product', name:'Sản phẩm',type:'link',icon:'inventory_2',role:'admin'},
    {state:'order', name:'Mua hàng',type:'link',icon:'shopping_cart',role:''},
    {state:'bill', name:'Hóa đơn',type:'link',icon:'backup_table',role:''},
    {state:'user', name:'Người dùng',type:'link',icon:'people',role:'admin'},

]

@Injectable()
export class MenuItems{
    getMenuItems():Menu[]{
        return MENUITEM;
    }
}