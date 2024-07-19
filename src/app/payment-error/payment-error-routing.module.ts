import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentErrorPage } from './payment-error.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentErrorPageRoutingModule {}
