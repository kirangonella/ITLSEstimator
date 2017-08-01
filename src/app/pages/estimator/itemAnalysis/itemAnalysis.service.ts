import { Injectable } from '@angular/core';


import { Item } from '../items/itemDefinition';
import { ITEMS } from '../items/itemData';
import { ItemDataJson } from '../items/itemDataJson';
import { ItemDetailsService } from '../itemDetails/itemdetails.service';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable()
export class ItemAnalysisService {

    /*  smartTableData;
      source: LocalDataSource = new LocalDataSource(); */

    /*  smartTableData = this.itemDataJson.getAll();
  
      constructor(
          private itemDataJson: ItemDataJson) {
      }*/

    /* constructor(protected itemAnalysisService: ItemAnalysisService,
         private itemDetailsService: ItemDetailsService) {
     } */

    /* getData(): Promise<any> {
         return new Promise((resolve, reject) => {
             setTimeout(() => {
                 resolve(this.getDataValues());
             }, 20);
         });
 
         //   console.log();
     } */

    /*  getDataValues(): any {
  
          this.smartTableData = [
              {
                  id: 1,
                  itemName: 'Mark',
                  saveFlag: 'Otto',
                  username: '@mdo',
                  email: 'mdo@gmail.com',
                  age: '28'
              },
              {
                  id: 2,
                  itemName: 'Jacob',
                  saveFlag: 'Thornton',
                  username: '@fat',
                  email: 'fat@yandex.ru',
                  age: '45'
              }];
  
          this.smartTableData.push({
              id: 3,
              itemName: 'Jacob Singh',
              saveFlag: 'False',
              username: '@fat',
              email: 'fat@yandex.ru',
              age: '45'
          });
  
          return this.smartTableData;
      } */

    /*  getDataValues(): void {
          this.itemDetailsService.getData().then((data) => {
              this.source.load(data);
          });
      }
  
      */
}
