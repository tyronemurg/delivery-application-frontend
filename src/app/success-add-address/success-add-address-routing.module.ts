import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessAddAddressPage } from './success-add-address.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessAddAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessAddAddressPageRoutingModule {}
