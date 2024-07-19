import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CartModalPageModule } from './cart-modal/cart-modal.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TabService} from './services/tab.service';
//IMPORT THE PLUGINS
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { CartService, Product } from './services/cart.service';
//import { PusherService } from './services/pusher.service';



@NgModule({
  declarations: [AppComponent],

  imports: [BrowserModule,FormsModule,ReactiveFormsModule,IonicModule.forRoot(), AgmCoreModule.forRoot({
    apiKey: '',
    libraries: ["places","geometry"]
  }), AppRoutingModule, HttpClientModule, CartModalPageModule, ServiceWorkerModule.register('ngsw-worker.js', {
  //enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  //registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },NativeStorage,TabService, Geolocation,    
    NativeGeocoder],
  bootstrap: [AppComponent],
})
export class AppModule { }


