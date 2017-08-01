import { Component, Input, OnInit } from '@angular/core';

import { ItemDetailsService } from '../itemDetails/itemdetails.service';
import { LocalDataSource } from 'ng2-smart-table';

import 'easy-pie-chart/dist/jquery.easypiechart.js';
import * as Chart from 'chart.js';
import pieceLabel from 'chart.piecelabel.js';

@Component({
    selector: 'nga-item-visualization',
    templateUrl: './itemVisualization.component.html',
    styleUrls: ['./itemVisualization.component.scss']
})
export class ItemVisualizationComponent implements OnInit {

    public charts: Array<Object>;
    doughnutData: Array<Object> = this.itemDetailsService.doughnutData;
    totalEffortDaysCalc: number = this.itemDetailsService.totalEffortDaysCalc;

    chartData: Object;
    private _init = false;

    sourcePhases: LocalDataSource = this.itemDetailsService.sourcePhases;

    settingsPhases = {
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

            itemName: {
                title: 'SDLC Phase',
                type: 'string'
            },
            totalEffort: {
                title: 'Effort Estimated',
                type: 'string'
            }
        },
        refresh: true
    };

    ngOnInit(): void {
        this.itemDetailsService.getDataValues();
        this.charts = this.itemDetailsService.getVisualizationData();
        this.doughnutData = this.itemDetailsService.getSDLCChartData();
        //  this.chartData = this.itemDetailsService.getTop5ItemsData();

    }

    constructor(private itemDetailsService: ItemDetailsService) {

    }

    ngAfterViewInit() {

        this.itemDetailsService._loadDoughnutCharts();
    }

    onSaveConfirm(event): void {

        if (window.confirm('Are you sure you want to save?')) {
            console.log('From onSave');
            // console.log(this.itemDetailsService.itemTableValuesReceived);
            // console.log(event);
            //  event.newData['totalEffort'] = event.newData['dIEffort'];

            //  console.log(event.newData['totalEffort']);
            //  event.confirm.resolve(event.newData);
            //  event.newData['totalEffort'] = event.newData['dIEffort'] * event.newData['numOfComponents'];
            event.confirm.resolve(event.newData);
            //  this.dataAfterTable = this.source.getAll();
            console.log('After Change onSaveConfirm');
            this.sourcePhases = event.source;
            this.sourcePhases.refresh();
            console.log(this.itemDetailsService.itemTableValuesReceived);
            this.itemDetailsService.getDataValues();
            this.itemDetailsService.callSDLCTable(this.itemDetailsService.itemTableValuesReceived);

        } else {
            event.confirm.reject();
        }
    }


}

