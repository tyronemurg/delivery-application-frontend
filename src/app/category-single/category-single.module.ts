import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySinglePageRoutingModule } from './category-single-routing.module';

import { CategorySinglePage } from './category-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySinglePageRoutingModule
  ],
  declarations: [CategorySinglePage]
})
export class CategorySinglePageModule {}
