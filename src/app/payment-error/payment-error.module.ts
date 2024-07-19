import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentErrorPageRoutingModule } from './payment-error-routing.module';

import { PaymentErrorPage } from './payment-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentErrorPageRoutingModule
  ],
  declarations: [PaymentErrorPage]
})
export class PaymentErrorPageModule {}
