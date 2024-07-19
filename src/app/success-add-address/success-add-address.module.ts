import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessAddAddressPageRoutingModule } from './success-add-address-routing.module';

import { SuccessAddAddressPage } from './success-add-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessAddAddressPageRoutingModule
  ],
  declarations: [SuccessAddAddressPage]
})
export class SuccessAddAddressPageModule {}
