import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '../../../node_modules/@ionic-native/geolocation/ngx';
declare var google;
import { ActionSheetController } from '@ionic/angular';
import { Location } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryService } from './../services/categories.service';
import { OrdersService } from '../services/orders.service';
import { BehaviorSubject } from 'rxjs';
import { CartService, Product } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { User } from 'src/app/models/user';
import { EnvService } from 'src/app/services/env.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-order-single',
  templateUrl: './order-single.page.html',
  styleUrls: ['./order-single.page.scss'],
})
export class OrderSinglePage implements OnInit {
  order:any;
  Orders: any;
  items : any;
  orderURL: any= [];
  orderID: any= [];
  result: any;
  data: any;
  address= {};
  token: string;
  latitude: Number = 0;
  longitude: Number = 0;
  lat: Number = -28.4792625 
  lng: Number = 24.6727135
  user: User;
  orderSummary:any;
  origin = { lat: 24.799448, lng: 120.979021 }
  iconUrl = "https://client-apps.co.za/carry1st/wp-content/uploads/2023/03/LOGO.png";
  
  destination : any;
  @ViewChild('mapElement') mapNativeElement: ElementRef;


  constructor( private authService: AuthService,private categoryService: CategoryService, private orderService: OrdersService, private cartService: CartService, private modalCtrl: ModalController, private route: ActivatedRoute,private sanitizer:DomSanitizer,private geolocation: Geolocation,private actionSheetCtrl: ActionSheetController,private location: Location) { }

  public renderOptions = {
    suppressMarkers: true,
}

public markerOptions = {
  origin: {
      icon: 'assets/b.png',
      draggable: true,
      animation: 'BOUNCE'
  },
  destination: {
      icon: 'assets/h.png',
      label: 'MARKER LABEL',
      opacity: 0.9,
      animation: 'DROP',
  },
}


  ngOnInit() {

    this.authService.user().subscribe(
      user => {

        this.user = user;
        if (this.user.is_first == 1){

        }
      }
    );

    this.orderURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.orderID);  
    this.orderService.getOrder(this.route.snapshot.params.id).subscribe((response:any) => {
      this.Orders = response;
      this.address = response.location
      this.latitude = Number(response.location.lat);
      this.longitude =Number(response.location.long);

      this.destination = {lat: this.latitude, lng: this.longitude}
      this.origin = { lat: -26.098298, lng: 28.0157626 };
      
      //console.log(this.origin);
      //console.log(this.destination);
this.items = JSON.parse(this.Orders.cart);
   //console.log(this.items);

    });

  }

  ngAfterViewInit(): void {
    this.orderService.getOrder(this.route.snapshot.params.id).subscribe((response:any) => {
      this.order = response;
      this.latitude = Number(response.location.lat);
      this.longitude =Number(response.location.long);
  
      this.geolocation.getCurrentPosition().then((resp) => {
        
        // this.longitude = resp.coords.longitude;
        const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });
        /*location object*/
        //console.log(this.latitude);
        //console.log(this.longitude);
        const pos = {
          lat: this.latitude,
          lng: this.longitude
        };
        map.setCenter(pos);
        const icon = {
          url: 'assets/ord.png', // image url
          scaledSize: new google.maps.Size(40, 40), // scaled size
        };
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Hello World!',
          icon: icon
        });
        // const contentString = '<div id="content">' +
        //     '<div id="siteNotice">' +
        //     '</div>' +
        //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        //     '<div id="bodyContent">' +
        //     '<img src="assets/icon-192x192.png" width="200">' +
        //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        //     'sandstone rock formation in the southern part of the ' +
        //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        //     'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        //     'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        //     'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        //     'Aboriginal people of the area. It has many springs, waterholes, ' +
        //     'rock caves and ancient paintings. Uluru is listed as a World ' +
        //     'Heritage Site.</p>' +
        //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        //     '(last visited June 22, 2009).</p>' +
        //     '</div>' +
        //     '</div>';
        const infowindow = new google.maps.InfoWindow({
        //  content: contentString,
          maxWidth: 0
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }).catch((error) => {
        //console.log('Error getting location', error);
      });
  
  
    });
    
  }
  
  
  
    back(): void {
      this.location.back()
    }
  

    ionViewWillEnter() {
      //console.log('Begin async operation');
      this.authService.user().subscribe(
        user => {
          this.user = user;
          
        }
      );
    }

}
