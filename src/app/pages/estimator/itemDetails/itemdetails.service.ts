import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Item } from '../items/itemDefinition';
import { ITEMS } from '../items/itemData';
import { SelectedValues } from './selectedValues';
import { questionaireValues } from './questionaireValues';
import { ItemTableValues } from './itemTableValueDefinition';
import { LocalDataSource } from 'ng2-smart-table';
import { VisualValuesPie } from './visualValuesPieDefinition';
import * as Chart from 'chart.js';

import { BaThemeConfigProvider, colorHelper, layoutPaths } from '../../../theme';

@Injectable()
export class ItemDetailsService {


    questionsSelected: Subject<SelectedValues[]> = new BehaviorSubject<SelectedValues[]>([]);
    itemTableValuesReceived: ItemTableValues[] = [];
    visualValuesPieService: VisualValuesPie[] = [];
    sDLCTableValuesCalculated: ItemTableValues[] = [];

    smartTableData;
    source: LocalDataSource = new LocalDataSource();
    sourcePhases: LocalDataSource = new LocalDataSource();

    doughnutData: Array<Object>;
    totalEffortDaysCalc: number = 0;
    calculatedQAEffortTempTable: number = 0;

    constructor(private http: Http,
        private _baConfig: BaThemeConfigProvider) {

    }

    setSelectedValues(question, value, valuesSelected) {

        //    console.log((valuesSelected.find(questionValue => valuesSelected.questionValues.questionId === question.questionId)).questionValues.questionValue);

        //   this.selectedValues.find(selectedEntry => selectedEntry.questionValues.questionId === question.questionId).questionValues.questionValue = value.optionId;

        //   console.log((this.selectedValues.find(selectedEntry => selectedEntry.questionValues.questionId === question.questionId)).questionValues.questionValue);

        //   for (const arrayValue of this.selectedValues.questionValues) {
        //        console.log(`{${arrayValue.questionId} , ${arrayValue.questionValue}}`);
        // console.log();
        //    }
    }

    getSelectedValues() {
        this.http
            .get('https://api.myjson.com/bins/z0byl')       // Real Data
            // .get('https://api.myjson.com/bins/mey47')  // Sample Data
            .map((res: any) => {
                return res.json();
            })
            .subscribe(
            (data: any) => {
                this.questionsSelected.next(data);
            },
            (err: any) => console.error('getSelectedValues: ERROR'),
            () => console.log('getSelectedValues: always')
            );
    }

    passItemTableValues(itemTableValues) {
        this.itemTableValuesReceived = itemTableValues;

        //    console.log('Inside passItemTableValues of ItemDetailsService');
        //   console.log(this.itemTableValuesReceived);
    }

    passVisualValues(visualValuesPieChart) {
        this.visualValuesPieService = visualValuesPieChart;
    }

    getData(): Promise<any> {
        //   console.log('Inside getdata itemdetails service: 2');
        //  console.log(this.itemTableValuesReceived);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.itemTableValuesReceived);
            }, 20);
        });


    }

    getDataCalculatedSDLC(): Promise<any> {
        //   console.log('Inside getDataCalculatedSDLC itemdetails service: 2');
        //   console.log(this.itemTableValuesReceived);
        let designImplEffortCalc = 0;
        let calculatedQAEffortTable: number = 0;
        let calculatedQAEffortTempTable: number = 0;

        for (let calcVal of this.itemTableValuesReceived) {
            let itemIndex = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === calcVal.itemId);
            if (calcVal.itemId === 11 || calcVal.itemId === 31 || calcVal.itemId === 32 || calcVal.itemId === 33) {
                if (itemIndex === -1) {
                    this.sDLCTableValuesCalculated.push(calcVal);
                } else {
                    this.sDLCTableValuesCalculated[itemIndex].itemId = calcVal.itemId;
                    this.sDLCTableValuesCalculated[itemIndex].itemName = calcVal.itemName;
                    this.sDLCTableValuesCalculated[itemIndex].complexity = calcVal.complexity;
                    this.sDLCTableValuesCalculated[itemIndex].dIEffort = calcVal.dIEffort;
                    this.sDLCTableValuesCalculated[itemIndex].numOfComponents = calcVal.numOfComponents;
                    this.sDLCTableValuesCalculated[itemIndex].totalEffort = calcVal.totalEffort;
                }

                //  if (calcVal.itemId === 33) {
                //      let itemIndexQA = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === calcVal.itemId);
                //      this.sDLCTableValuesCalculated[itemIndexQA].totalEffort = 40;
                //  }

            } else {
                let itemIndexVal = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === 55);
                designImplEffortCalc = designImplEffortCalc + calcVal.totalEffort.valueOf();

                if (itemIndexVal === -1) {
                    //   designImplEffortCalc = designImplEffortCalc + calcVal.totalEffort.valueOf();

                    //   let itemIndexQA = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === calcVal.itemId);
                    //   this.sDLCTableValuesCalculated[itemIndexQA].totalEffort = 40;

                    this.sDLCTableValuesCalculated.push({
                        itemId: 55,
                        itemName: 'Design & Implementation',
                        saveFlag: true,
                        complexity: 'HIGH',
                        numOfComponents: 1,
                        dIEffort: designImplEffortCalc,
                        totalEffort: designImplEffortCalc
                    });

                } else {
                    //    console.log('Inside getSDLCValues');
                    //    console.log(calcVal.totalEffort.valueOf());
                    //  designImplEffortCalc = designImplEffortCalc + calcVal.totalEffort.valueOf();
                    this.sDLCTableValuesCalculated[itemIndexVal].totalEffort = designImplEffortCalc;
                }
            }
        }

        for (const effValue of this.sDLCTableValuesCalculated) {
            //  calculatedQAEffortTemp
            if (effValue.itemId !== 11 && effValue.itemId !== 31 && effValue.itemId !== 32 && effValue.itemId !== 33) {
                calculatedQAEffortTempTable = calculatedQAEffortTempTable + effValue.totalEffort.valueOf();
            }
        }

        let itemIndexQA = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === 33);
        if (itemIndexQA !== -1) {
            calculatedQAEffortTable = Math.round((40 / 100) * calculatedQAEffortTempTable);
            this.sDLCTableValuesCalculated[itemIndexQA].totalEffort = calculatedQAEffortTable;
            this.sDLCTableValuesCalculated[itemIndexQA].dIEffort = calculatedQAEffortTable;
        }

        //  console.log(this.itemTableValuesReceived);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.sDLCTableValuesCalculated);
            }, 10);
        });


    }

    getDataValues(): void {

        //   console.log('Inside getDataValues itemdetails service : 1');
        this.getData().then((data) => {
            this.source.load(data);
        });

        //   console.log(this.source);
    }

    callSDLCTable(itemTableValuesReceivedFromAnalysis) {
        //    console.log('Inside CallSDLC Table Start');
        //    console.log(itemTableValuesReceivedFromAnalysis);
        //    console.log(this.itemTableValuesReceived);
        //    console.log('Inside CallSDLC Table End');
        this.getDataValuesSDLCTable();
    }

    getDataValuesSDLCTable(): void {

        //   console.log('Inside getDataValuesSDLCTables itemdetails service : 1');
        this.getDataCalculatedSDLC().then((data) => {
            this.sourcePhases.load(data);
        });

        //   console.log(this.sourcePhases);
        this.doughnutData = this.getSDLCChartData();
        this._loadDoughnutCharts();
    }

    getVisualizationData() {
        let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
        return [
            {
                color: pieColor,
                description: 'Effort Days',
                stats: '456',
                icon: 'person',
            }, {
                color: pieColor,
                description: 'High',
                stats: '250',
                icon: 'money',
            }, {
                color: pieColor,
                description: 'Medium',
                stats: '100',
                icon: 'face',
            }, {
                color: pieColor,
                description: 'Low',
                stats: '101',
                icon: 'refresh',
            }
        ];
    }


    getSDLCChartData() {

        let doughnutDiscoveryValue = 0;
        let doughnutDesignImplValue = 0;
        let doughnutQAValue = 0;
        let doughnutEnvBuildValue = 0;
        let doughnutUATILValue = 0;
        let doughnutTotalEffort = 0;

        let doughnutDiscoveryPercentageValue = 0;
        let doughnutDesignImplPercentageValue = 0;
        let doughnutQAPercentageValue = 0;
        let doughnutEnvBuildPercentageValue = 0;
        let doughnutUATILPercentageValue = 0;



        for (let selVal of this.sDLCTableValuesCalculated) {
            //  let itemIndex = this.sDLCTableValuesCalculated.findIndex(updatedItem => updatedItem.itemId === 11);
            if (selVal.itemId === 11) {
                doughnutDiscoveryValue = selVal.totalEffort.valueOf();
            } else if (selVal.itemId === 31) {
                doughnutEnvBuildValue = selVal.totalEffort.valueOf();
            } else if (selVal.itemId === 55) {
                doughnutDesignImplValue = selVal.totalEffort.valueOf();
            } else if (selVal.itemId === 32) {
                doughnutUATILValue = selVal.totalEffort.valueOf();
            } else if (selVal.itemId === 33) {
                doughnutQAValue = selVal.totalEffort.valueOf();
            }

            doughnutTotalEffort = doughnutDiscoveryValue + doughnutEnvBuildValue + doughnutDesignImplValue + doughnutUATILValue + doughnutQAValue;
            this.totalEffortDaysCalc = doughnutTotalEffort;
        }

        console.log('Inside getSDLCChartData Start');
        //    console.log(this.sDLCTableValuesCalculated);
        console.log(doughnutDiscoveryValue);
        console.log(doughnutDesignImplValue);
        console.log(doughnutQAValue);
        console.log(doughnutEnvBuildValue);
        console.log(doughnutUATILValue);
        console.log(doughnutTotalEffort);
        console.log('Inside getSDLCChartData End');

        if (doughnutTotalEffort > 0) {
            doughnutDiscoveryPercentageValue = ((doughnutDiscoveryValue / doughnutTotalEffort) * 100);
            doughnutDesignImplPercentageValue = ((doughnutDesignImplValue / doughnutTotalEffort) * 100);
            doughnutQAPercentageValue = ((doughnutQAValue / doughnutTotalEffort) * 100);
            doughnutEnvBuildPercentageValue = ((doughnutEnvBuildValue / doughnutTotalEffort) * 100);
            doughnutUATILPercentageValue = ((doughnutUATILValue / doughnutTotalEffort) * 100);

            console.log(doughnutDiscoveryValue);
            console.log(doughnutDiscoveryPercentageValue);
        }

        let dashboardColors = this._baConfig.get().colors.dashboard;
        return [
            {
                value: doughnutDiscoveryValue,
                color: dashboardColors.white,
                highlight: colorHelper.shade(dashboardColors.white, 15),
                label: 'Requirements Analysis',
                percentage: doughnutDiscoveryPercentageValue,
                order: 1,
            }, {
                value: doughnutDesignImplValue,
                color: dashboardColors.gossip,
                highlight: colorHelper.shade(dashboardColors.gossip, 15),
                label: 'Design & Implementation',
                percentage: doughnutDesignImplPercentageValue,
                order: 4,
            }, {
                value: doughnutQAValue,
                color: dashboardColors.silverTree,
                highlight: colorHelper.shade(dashboardColors.silverTree, 15),
                label: 'Quality Assurance',
                percentage: doughnutQAPercentageValue,
                order: 3,
            }, {
                value: doughnutEnvBuildValue,
                color: dashboardColors.surfieGreen,
                highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
                label: 'Environment & Build Setup',
                percentage: doughnutEnvBuildPercentageValue,
                order: 2,
            }, {
                value: doughnutUATILValue,
                color: dashboardColors.blueStone,
                highlight: colorHelper.shade(dashboardColors.blueStone, 15),
                label: 'UAT, Initial Load & Go-Live',
                percentage: doughnutUATILPercentageValue,
                order: 0,
            },
        ];
    }

    _loadDoughnutCharts() {
        let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
        new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
            segmentShowStroke: false,
            percentageInnerCutout: 64,
            responsive: true,
            legend: true
        });

        //  totalEffortDaysCalc

        //  console.log(this.doughnutData);
    }
}
