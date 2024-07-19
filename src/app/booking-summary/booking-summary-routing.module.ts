import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSummaryPage } from './booking-summary.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSummaryPageRoutingModule {}
