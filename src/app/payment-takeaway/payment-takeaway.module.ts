import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentTakeawayPageRoutingModule } from './payment-takeaway-routing.module';

import { PaymentTakeawayPage } from './payment-takeaway.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentTakeawayPageRoutingModule
  ],
  declarations: [PaymentTakeawayPage]
})
export class PaymentTakeawayPageModule {}
