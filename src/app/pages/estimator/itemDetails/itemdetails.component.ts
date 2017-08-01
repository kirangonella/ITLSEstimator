import 'rxjs';
import { Component, Input, OnInit } from '@angular/core';


import { Item } from '../items/itemDefinition';
import { ItemDetailsService } from './itemdetails.service';
import { SelectedValues } from './selectedValues';
import { ItemTableValues } from './itemTableValueDefinition';
import { VisualValuesPie } from './visualValuesPieDefinition';


@Component({
    selector: 'nga-estimator-item-details',
    templateUrl: './itemdetails.component.html',
    styleUrls: ['./itemdetails.component.scss']
})
export class ItemDetailsComponent implements OnInit {

    //  @Input() item = this.itemService.getItem();
    @Input() item;

    valuesSelected: SelectedValues[];
    itemTableValues: ItemTableValues[] = [];
    selectedEntry;
    visualValuesPie: VisualValuesPie[] = [];

    questionaireOptions = [{ 'optionId': 1, 'optionValue': 'Yes' }, { 'optionId': 2, 'optionValue': 'No' }, { 'optionId': 3, 'optionValue': 'Not Sure' }, { 'optionId': 4, 'optionValue': 'To Certain Extent' }];

    constructor(private itemdetailsService: ItemDetailsService) {
    }

    resetChanges(question, value, item) {
        for (const arrayValue of this.valuesSelected) {
            for (const arrayQuestionValue of arrayValue.questionValues) {
                if (arrayValue.questionGroup === item.id) {
                    arrayQuestionValue.questionValue = 3;
                }
            }
        }
    }

    saveValues(question, value, item) {

        //  console.log(item);
        let calculatedDIEffort = 0;
        let calculatedTotalEffort = 0;
        let calculatedComplexity = 'LOW';
        let calculatedValue = 0;
        let count = 0;
        item.saveFlag = true;
        let calculatedQAEffort = 0;
        let calculatedQAEffortTemp = 0;


        //  for (const arrayValue of this.valuesSelected) {
        //   for (const arrayQuestionValue of arrayValue.questionValues) {

        // console.log(item);
        //  console.log(arrayQuestionValue.questionId);
        //  console.log(arrayQuestionValue.questionValue);

        calculatedValue = 0;
        count = 0;

        for (const arrayValue of this.valuesSelected) {
            for (const arrayQuestionValue of arrayValue.questionValues) {
                /*  if (arrayValue.questionGroup === 11 || arrayValue.questionGroup === 13) {
                      count++;
                      //    console.log('arrayQuestionValue');
                      //    console.log(arrayQuestionValue);
                      if (arrayQuestionValue.questionValue === 1) {
                          calculatedValue = calculatedValue + 50;
                          //  calculatedValue = 20;
                      } else if (arrayQuestionValue.questionValue === 2) {
                          calculatedValue = calculatedValue + 10;
                          //  calculatedValue = 10;
                      } else if (arrayQuestionValue.questionValue === 3) {
                          calculatedValue = calculatedValue + 15;
                          //  calculatedValue = 10;
                      } else if (arrayQuestionValue.questionValue === 4) {
                          calculatedValue = calculatedValue + 35;
                          //   calculatedValue = 15;
                      }
                  } else if (arrayValue.questionGroup === 32 || arrayValue.questionGroup === 12) {
                      count++;
                      //    console.log('arrayQuestionValue');
                      //    console.log(arrayQuestionValue);
                      if (arrayQuestionValue.questionValue === 1) {
                          calculatedValue = calculatedValue + 50;
                          //   calculatedValue = calculatedValue + 30;
                      } else if (arrayQuestionValue.questionValue === 2) {
                          calculatedValue = calculatedValue + 10;
                          // calculatedValue = calculatedValue + 10;
                      } else if (arrayQuestionValue.questionValue === 3) {
                          calculatedValue = calculatedValue + 15;
                          // calculatedValue = calculatedValue + 15;
                      } else if (arrayQuestionValue.questionValue === 4) {
                          calculatedValue = calculatedValue + 35;
                          // calculatedValue = calculatedValue + 22;
                      }
                  } else */

                if (arrayValue.questionGroup === item.id) {
                    count++;
                    //    console.log('arrayQuestionValue');
                    //    console.log(arrayQuestionValue);
                    if (arrayQuestionValue.questionValue === 1) {
                        calculatedValue = calculatedValue + 50;
                    } else if (arrayQuestionValue.questionValue === 2) {
                        calculatedValue = calculatedValue + 10;
                    } else if (arrayQuestionValue.questionValue === 3) {
                        calculatedValue = calculatedValue + 15;
                    } else if (arrayQuestionValue.questionValue === 4) {
                        calculatedValue = calculatedValue + 35;
                    }
                }


            }


        }

        //   for (const arrayValue of this.valuesSelected) {
        //       if (arrayValue.questionGroup === 11 || arrayValue.questionGroup === 13) {
        //           calculatedComplexity = calculatedValue;
        //      }
        //   }


        calculatedValue = calculatedValue / count;
        if (calculatedValue > 30) {
            calculatedComplexity = 'HIGH';
            calculatedDIEffort = 30;

        } else if (calculatedValue > 20 && calculatedValue <= 30) {
            calculatedComplexity = 'MEDIUM';
            calculatedDIEffort = 22;
        } else if (calculatedValue <= 20) {
            calculatedComplexity = 'LOW';
            calculatedDIEffort = 17;
        }

        console.log(calculatedValue);




        // if () {

        //  }

        calculatedTotalEffort = calculatedDIEffort * 1;
        //  console.log(calculatedValue);

        let itemIndex = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === item.id);

        if (itemIndex === -1) {
            //   console.log('Inside ItemDetails.Component, save values: IF');
            //   console.log(itemIndex);
            this.itemTableValues.push({
                itemId: item.id,
                itemName: item.itemName,
                saveFlag: true,
                complexity: calculatedComplexity,
                numOfComponents: 1,
                dIEffort: calculatedDIEffort,
                totalEffort: calculatedDIEffort * 1
            });

            let itemIndexEnvSetUp = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 31);
            if (itemIndexEnvSetUp !== -1 && this.itemTableValues[itemIndexEnvSetUp].itemId === 31) {
                this.itemTableValues[itemIndexEnvSetUp].dIEffort = 35;
                this.itemTableValues[itemIndexEnvSetUp].totalEffort = 35;
                console.log(`itemIndexEnvSetUp  ELSE: ${itemIndexEnvSetUp}`);
            }

            let itemIndexUAT = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 32);
            if (itemIndexUAT !== -1 && this.itemTableValues[itemIndexUAT].itemId === 32) {
                this.itemTableValues[itemIndexUAT].dIEffort = 50;
                this.itemTableValues[itemIndexUAT].totalEffort = 50;
                console.log(`itemIndexUAT  ELSE: ${itemIndexUAT}`);
            }

            let itemIndexReqAn = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 11);
            if (itemIndexReqAn !== -1 && this.itemTableValues[itemIndexReqAn].itemId === 11) {
                this.itemTableValues[itemIndexReqAn].dIEffort = 32;
                this.itemTableValues[itemIndexReqAn].totalEffort = 32;
                console.log(`itemIndexReqAn ELSE: ${itemIndexReqAn}`);
            }


        } else {
            //   console.log('Inside ItemDetails.Component, save values: ELSE');
            //   console.log(itemIndex);
            this.itemTableValues[itemIndex].itemId = item.id;
            this.itemTableValues[itemIndex].itemName = item.itemName;
            this.itemTableValues[itemIndex].complexity = calculatedComplexity;
            this.itemTableValues[itemIndex].dIEffort = calculatedDIEffort;
            this.itemTableValues[itemIndex].numOfComponents = 1;
            this.itemTableValues[itemIndex].totalEffort = calculatedDIEffort * 1;

            let itemIndexEnvSetUp = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 31);
            if (itemIndexEnvSetUp !== -1 && this.itemTableValues[itemIndexEnvSetUp].itemId === 31) {
                this.itemTableValues[itemIndexEnvSetUp].dIEffort = 35;
                this.itemTableValues[itemIndexEnvSetUp].totalEffort = 35;
                console.log(`itemIndexEnvSetUp  ELSE: ${itemIndexEnvSetUp}`);
            }

            let itemIndexUAT = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 32);
            if (itemIndexUAT !== -1 && this.itemTableValues[itemIndexUAT].itemId === 32) {
                this.itemTableValues[itemIndexUAT].dIEffort = 50;
                this.itemTableValues[itemIndexUAT].totalEffort = 50;
                console.log(`itemIndexUAT  ELSE: ${itemIndexUAT}`);
            }

            let itemIndexReqAn = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 11);
            if (itemIndexReqAn !== -1 && this.itemTableValues[itemIndexReqAn].itemId === 11) {
                this.itemTableValues[itemIndexReqAn].dIEffort = 32;
                this.itemTableValues[itemIndexReqAn].totalEffort = 32;
                console.log(`itemIndexReqAn ELSE: ${itemIndexReqAn}`);
            }
        }

        for (const effValue of this.itemTableValues) {
            //  calculatedQAEffortTemp
            if (effValue.itemId !== 11 && effValue.itemId !== 31 && effValue.itemId !== 32 && effValue.itemId !== 33) {
                calculatedQAEffortTemp = calculatedQAEffortTemp + effValue.totalEffort.valueOf();
            }
        }

        let itemIndexQA = this.itemTableValues.findIndex(updatedItem => updatedItem.itemId === 33);
        calculatedQAEffort = Math.round((50 / 100) * calculatedQAEffortTemp);
        // console.log(`calculatedQAEffortTemp: ${calculatedQAEffortTemp}`);
        // console.log(`calculatedQAEffort: ${calculatedQAEffort}`);
        if (itemIndexQA !== -1) {
            this.itemTableValues[itemIndexQA].totalEffort = calculatedQAEffort;
            this.itemTableValues[itemIndexQA].dIEffort = calculatedQAEffort;
        }



        //  console.log('Inside ItemDetails.Component, save values');
        //   console.log(itemIndex);



        let effortDaysTemp = 0;
        let highComplexTemp = 0;
        let mediumComplexTemp = 0;
        let lowComplexTemp = 0;
        let totalComplex = 0;

        for (const visualValues of this.itemTableValues) {
            effortDaysTemp = effortDaysTemp + visualValues.totalEffort.valueOf();
            if (visualValues.complexity === 'HIGH') {
                highComplexTemp = highComplexTemp + 1;
            } else if (visualValues.complexity === 'MEDIUM') {
                mediumComplexTemp = mediumComplexTemp + 1;
            } else if (visualValues.complexity === 'LOW') {
                lowComplexTemp = lowComplexTemp + 1;
            }
        }

        totalComplex = highComplexTemp + mediumComplexTemp + lowComplexTemp;



        this.visualValuesPie.push({
            effortDays: effortDaysTemp,
            highComplex: (highComplexTemp / totalComplex) * 100,
            mediumComplex: (mediumComplexTemp / totalComplex) * 100,
            lowComplex: (lowComplexTemp / totalComplex) * 100
        });


        //  }
        //  }
        //  if (!isValid) { return; }
        //   console.log(this.values);
        //  console.log(this.itemTableValues);

        this.itemdetailsService.passItemTableValues(this.itemTableValues);
        this.itemdetailsService.passVisualValues(this.visualValuesPie);
        this.itemdetailsService.getDataValues();
        this.itemdetailsService.getDataValuesSDLCTable();

        //   this.itemdetailsService._updatePieCharts();
    }

    ngOnInit(): void {
        //  this.getItems();
        //   console.log('Hello 1');

        this
            .itemdetailsService
            .questionsSelected
            .subscribe((valuesSelected: SelectedValues[]) => {

                this.valuesSelected = valuesSelected;
                //  console.log('Hello 3');
                //  console.log(valuesSelected);
            });

        // make the http request
        this.itemdetailsService.getSelectedValues();
    }

    onClick(item: Item) {
        //  console.log('Item Details Saved');
        //  console.log(item.id);
        item.saveFlag = true;
        //  this.itemService.setItem(item);
    }

    onSelectionChange(entry) {
        this.selectedEntry = entry;
        //  console.log(this.selectedEntry);
    }

    onClickValue(question, value, item) {

        for (const arrayValue of this.valuesSelected) {
            for (const arrayQuestionValue of arrayValue.questionValues) {
                if (arrayQuestionValue.questionId === question.questionId) {
                    // console.log(item);
                    //   console.log(arrayQuestionValue.questionId);
                    //   console.log(arrayQuestionValue.questionValue);

                    arrayValue.hideQuestionFlag = false;
                    arrayQuestionValue.questionValue = value.optionId;

                    //   console.log(arrayQuestionValue.questionValue);


                }
            }
        }
    }
}
