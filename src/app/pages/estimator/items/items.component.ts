import { Component, NgModule, OnInit, Input } from '@angular/core';

import { Item } from '../items/itemDefinition';
import { ItemDetailsService } from '../itemDetails/itemdetails.service';
import { ItemDataJson } from '../items/itemDataJson';


@Component({
    selector: 'nga-estimator-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

    items: Item[];
    selectedItem: Item;
    //  item = this.itemsService.getItem();
    errorMessage: any;

    constructor(private itemDataJson: ItemDataJson) { }

    //  getItems(): void {
    //  this.itemsService.getItems().then(items => this.items = items);
    //      this.itemsService.getItems().then(items => this.items = items);
    //   }

    ngOnInit(): void {
        //  this.getItems();
        //   console.log('Hello 1');

        this
            .itemDataJson
            .itemData
            .subscribe((items: Item[]) => {

                this.items = items;
                console.log('Hello 3');
                console.log(items);
            });

        // make the http request
        this.itemDataJson.getAll();
    }

    refreshData() {
        // re-set the ui
        this.items.length = 0;

        // make the http request
        this.itemDataJson.getAll();
    }


    onSelect(item: Item): void {
        this.selectedItem = item;
        //    console.log('Hello 2');
        this.passItem(this.selectedItem);
    }

    passItem(itemSelected) {
        //  this.itemsService.setItem(itemSelected = this.selectedItem);
        //    console.log('Hello 3');
    }

    isEmptyObject(items) {
        return (items && (Object.keys(items).length === 0));
    }
}
