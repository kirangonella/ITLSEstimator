import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from '../itemDetails/itemdetails.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ItemsComponent,
        ItemDetailsComponent
    ]
})
export class ItemsModule { }
