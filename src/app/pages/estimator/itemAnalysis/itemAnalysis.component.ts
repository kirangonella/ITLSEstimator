import 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import { Item } from '../items/itemDefinition';
import { ItemsService } from '../items/items.service';

import { ItemAnalysisService } from './itemAnalysis.service';
import { ItemDetailsService } from '../itemDetails/itemdetails.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'nga-estimator-item-analysis',
    templateUrl: './itemAnalysis.component.html',
    styleUrls: ['./itemAnalysis.component.scss']
})
export class ItemAnalysisComponent implements OnInit {


    items: Item[];
    query: string = '';
    dataAfterTable = [];

    settings = {
        actions: {
            add: true
        },
        hideSubHeader: true,
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
            createButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="ion-edit"></i>',
            saveButtonContent: '<i class="ion-checkmark"></i>',
            cancelButtonContent: '<i class="ion-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="ion-trash-a"></i>',
            confirmDelete: true
        },
        columns: {
            itemId: {
                title: 'ID',
                type: 'number'
            },
            itemName: {
                title: 'Item Name',
                type: 'string'
            },
            complexity: {
                title: 'Complexity',
                type: 'string'
            },
            numOfComponents: {
                title: 'No. Of Components',
                type: 'string'
            },
            dIEffort: {
                title: 'Component Effort',
                type: 'string'
            },
            totalEffort: {
                title: 'Total Effort',
                type: 'string'
            }
        }
    };

    source: LocalDataSource = this.itemDetailsService.source;
    // item = this.itemsService.getItem();

    ngOnInit(): void {
        //  this.getItems();

        //  this.itemsService.selectedItem$.subscribe(
        //       items => {
        //          this.getItems();
        //      });

        this.itemDetailsService.getDataValues();

    }

    /*  getDataValues(): void {
          this.itemDetailsService.getData().then((data) => {
              this.source.load(data);
          });
      } */

    /*  getItems(): void {
          this.itemAnalysisService.getData().then((data) => {
              this.source.load(data);
          });
      }*/

    constructor(private itemDetailsService: ItemDetailsService) {
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onSaveConfirm(event): void {

        if (window.confirm('Are you sure you want to save?')) {
            console.log('From onSave');
            console.log(this.itemDetailsService.itemTableValuesReceived);
            // console.log(event);
            // event.newData['totalEffort'] = event.newData['dIEffort'];

            //  console.log(event.newData['totalEffort']);
            //  event.confirm.resolve(event.newData);
            event.newData['totalEffort'] = event.newData['dIEffort'] * event.newData['numOfComponents'];
            event.confirm.resolve(event.newData);
            //  this.dataAfterTable = this.source.getAll();
            console.log('After Change');
            // this.source = event.source;
            this.source.refresh();
            console.log(this.itemDetailsService.itemTableValuesReceived);
            this.itemDetailsService.getDataValues();
            this.itemDetailsService.callSDLCTable(this.itemDetailsService.itemTableValuesReceived);

        } else {
            event.confirm.reject();
        }
    }
}

