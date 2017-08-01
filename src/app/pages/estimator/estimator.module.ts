import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbRadioGroup, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { EstimatorComponent } from './estimator.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './itemDetails/itemdetails.component';
import { ItemAnalysisComponent } from './itemAnalysis/itemAnalysis.component';
import { routing } from './estimator.routing';
import { ItemsService } from './items/items.service';
import { ItemDataJson } from './items/itemDataJson';
import { ItemDetailsService } from './itemDetails/itemdetails.service';
import { ItemAnalysisService } from './itemAnalysis/itemAnalysis.service';
import { ItemVisualizationComponent } from './itemVisualization/itemvisualization.component';

@NgModule({
    imports: [
        CommonModule,
        AngularFormsModule,
        AppTranslationModule,
        NgaModule,
        NgbRatingModule,
        Ng2SmartTableModule,
        routing
    ],
    declarations: [
        EstimatorComponent,
        ItemsComponent,
        ItemDetailsComponent,
        ItemAnalysisComponent,
        ItemVisualizationComponent
    ],
    providers: [ItemsService, ItemDetailsService, ItemAnalysisService, ItemDataJson]
})
export class EstimatorModule { }
