import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentTakeawayPage } from './payment-takeaway.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentTakeawayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentTakeawayPageRoutingModule {}
