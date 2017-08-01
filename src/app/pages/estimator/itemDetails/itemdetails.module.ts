import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemDetailsComponent } from './itemdetails.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ItemDetailsComponent
    ]
})
export class ItemsModule { }
