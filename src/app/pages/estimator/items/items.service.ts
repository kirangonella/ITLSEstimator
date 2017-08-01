import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Item } from './itemDefinition';
import { ITEMS } from '../items/itemData';
import { ItemDataJson } from '../items/itemDataJson';

@Injectable()
export class ItemsService {

    items: Item[];
    private selectedItem2 = new Subject<Item>();

    selectedItem: Item;
    selectedItem$ = this.selectedItem2.asObservable();

    constructor(private itemDataJson: ItemDataJson) { }


    getItems(): Promise<any> {
        return Promise.resolve(this.itemDataJson.getAll());
    }

    setItem(selectedItem: Item) {
        this.selectedItem = selectedItem;
        //  console.log(`From Service`);
        //  console.log(this.getItem());
        this.selectedItem2.next(selectedItem);
        console.log(this.getItem().saveFlag);
    }

    getItem() {
        //   console.log(`From Service getItem`);
        //   console.log(this.selectedItem);
        return this.selectedItem;
    }
}
