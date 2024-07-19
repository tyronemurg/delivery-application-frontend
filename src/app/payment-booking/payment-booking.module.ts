import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PaymentBookingPageRoutingModule } from './payment-booking-routing.module';

import { PaymentBookingPage } from './payment-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    PaymentBookingPageRoutingModule
  ],
  declarations: [PaymentBookingPage]
})
export class PaymentBookingPageModule {}
