import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EnvService } from '../services/env.service';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Product } from '../services/cart.service';
import { Order } from '../models/order';

declare var google;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements AfterViewInit, OnInit {
  @ViewChild('search') searchElementRef: ElementRef;
  user:any;
  token:any;
  ok:true;
  cart: any;
  show: boolean;
  latitude :any;
  longitude:any;
  zoom:any;
  ot:any;
  ourPlace:any;
  location:any;
  order:any;
  locationID:any;
  totalCost:any;
  distance:any;
  orderType:any;
  constructor(private modalCtrl: ModalController,private cartService: CartService,public ngZone: NgZone, private navCtrl: NavController, private env: EnvService, public mapsAPILoader: MapsAPILoader,private http: HttpClient,private router:Router,private authService: AuthService, ) { }

  ngOnInit() {
    this.orderType =  JSON.parse(localStorage.getItem('orderType'));   
    this.ot = this.orderType.orderType;
    //alert(this.ot);
    if (this.ot === "delivery"){
			this.router.navigate(['payment']);
		  }
      else if (this.ot === "takeaway"){
        this.router.navigate(['payment-takeaway']);
        }
        else if (this.ot === "booktable"){
          this.router.navigate(['payment-booking']);
          }
		  else{
			this.router.navigate(['home']);
			}
		
    console.log(this.orderType.orderType);
    this.show = true
    this.cart = this.cartService.getCart();
    if (localStorage.getItem('token')) {

      this.token =  localStorage.getItem('token');   
      let tok =JSON.parse(this.token) 
      //console.log(tok.access_token)
      const headers = new HttpHeaders({
        'Authorization': "Bearer"+ " " +tok.access_token
      });
      this.http.get<any>(this.env.API_URL + 'auth/customer/address', { headers: headers }).subscribe(data => {
        this.location = data.locations;
        //console.log(this.location);
    }) 

      
      }
      else{
        const headers = new HttpHeaders({
          'Authorization': this.token["token_type"]+" "+this.token["access_token"]
        });
        return this.http.get(this.env.API_URL + 'auth/user', { headers: headers })
        .pipe(
          tap(user => {
            return user;
          })
        )
      }

      if (localStorage.getItem('orderType')) {
        this.orderType =  localStorage.getItem('orderType');   
        console.log(this.orderType);
      }
      else{
      
      }
      

  }

  radioChecked(id, i){
    this.location.forEach(item=>{
      if(item.id !== id){ 
         item.selected = false;
         this.show = true;
      }else{
         item.selected = true;
         this.show = false;
      } 
    })
  }

	decreaseCartItem(product: Product): void {
		this.cartService.decreaseProduct(product);
	}

	increaseCartItem(product: Product): void {
		this.cartService.addProduct(product);
	}

	removeCartItem(product: Product): void {
		this.cartService.removeProduct(product);
	}

	getTotal(): number {
		return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
	}

	

	close(){
		this.modalCtrl.dismiss();
	}

  getAddresses(){
    
  }

  ionViewWillEnter() {
    //console.log('Begin async operation');
    localStorage.getItem('token');
    //console.log(localStorage.getItem('token'));
    this.authService.user().subscribe(
      user => {
        this.user = user;
        //console.log(this.user);
      }
    );
  }


  
  ngAfterViewInit() {
this.findAdress();
  }

  findAdress(){
    this.mapsAPILoader.load().then(() => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
         autocomplete.addListener("place_changed", () => {
           this.ngZone.run(() => {
             // some details
             let place: google.maps.places.PlaceResult = autocomplete.getPlace();

             this.latitude = place.geometry.location.lat();
             this.longitude = place.geometry.location.lng();
             this.zoom = 12;
             this.ourPlace = place.adr_address
             //console.log(place.adr_address);
           });
         });
       });
   }

  

   onSubmit(address) {


    this.locationID = address.value.address;
    //get location from iD
    this.http.get('https://app.veloportal.co.za/api/location/'+this.locationID).subscribe((res: any) => {
          this.location = res;
          //console.log(this.location);
          //calculate distance and order totals
         //Calculate distance
         const pickUpAddress = new google.maps.LatLng(this.location.lat, this.location.long);
         //console.log(pickUpAddress);
         // Static dropp address (Pretoria)
         const dropOffAddress = new google.maps.LatLng(-25.7478676, 28.2292712);
          this.distance = google.maps.geometry.spherical.computeDistanceBetween(pickUpAddress, dropOffAddress);
        
this.order = new Order();
this.order.location_id = this.locationID;
this.order.user_id = this.user.id;
this.order.distance = this.distance;

localStorage.setItem('order', JSON.stringify(this.order));

this.navCtrl.navigateRoot('/confirmation');
     
        });

           
          }

          goBack() {
            this.navCtrl.back();
            }
        

            

  }