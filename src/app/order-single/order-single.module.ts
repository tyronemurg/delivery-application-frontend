import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderSinglePageRoutingModule } from './order-single-routing.module';

import { OrderSinglePage } from './order-single.page';
import {Geolocation} from '../../../node_modules/@ionic-native/geolocation/ngx';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      // @agm/core
      apiKey: '',
    }),
    AgmDirectionModule,
    FormsModule,
    IonicModule,
    OrderSinglePageRoutingModule
  ],
  declarations: [OrderSinglePage],
  providers: [GoogleMapsAPIWrapper,Geolocation],
})
export class OrderSinglePageModule {}
