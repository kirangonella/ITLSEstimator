import { Item } from './itemDefinition';
import { Injectable } from '@angular/core';
import { Http, Headers, BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemDataJson {
    itemData: Subject<Item[]> = new BehaviorSubject<Item[]>([]);

    constructor(private http: Http) {

    }

    getAll() {
        this.http
            .get('https://api.myjson.com/bins/k2dg5')       // Real Data
            // .get('https://api.myjson.com/bins/mey47')  // Sample Data
            .map((res: any) => {
                return res.json();
            })
            .subscribe(
            (data: any) => {
                this.itemData.next(data);
            },
            (err: any) => console.error('getAll: ERROR'),
            () => console.log('getAll: always')
            );
    }

}
