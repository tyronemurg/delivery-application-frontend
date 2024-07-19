import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentBookingPage } from './payment-booking.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentBookingPageRoutingModule {}
