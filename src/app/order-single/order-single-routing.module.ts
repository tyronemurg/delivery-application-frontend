import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSinglePage } from './order-single.page';

const routes: Routes = [
  {
    path: '',
    component: OrderSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderSinglePageRoutingModule {}
