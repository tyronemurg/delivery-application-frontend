import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySinglePage } from './category-single.page';

const routes: Routes = [
  {
    path: '',
    component: CategorySinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorySinglePageRoutingModule {}
