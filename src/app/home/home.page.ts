
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Product } from './../services/cart.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/categories.service';
import { PusherService } from '../services/pusher.service';
import {products} from './mock.data';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  results = false;
  fCart=[];
  data = null;
  size: Number;
  searchdata: any[];
  filterKeys = ['name', 'price', 'img'];
  baseUrl = "https://app.veloportal.co.za/storage/";
  user: User;  
  token: string;
  baseURL: string = "https://app.veloportal.co.za/api/auth/customer/accept/fcm";
  

  cart = [];
	products = [];
	cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  @ViewChild('searchbar') searchbar: ElementRef;
  search = '';

  categories = [];
  highlights = [];
  featured = [];

  catSlideOpts = {
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  highlightSlideOpts =  {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  };

  featuredSlideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true
  };

  showLocationDetail = false;
  jsonResponse: any;
  

  constructor(private router:Router,private elem: ElementRef, private http: HttpClient, private categoryService: CategoryService, private cartService: CartService, private modalCtrl: ModalController, private authService: AuthService,) { 

    // setTimeout(() => {
    //   this.data.push({
    //     thumbnail: "URL",
    //     title: "Connecting",
    //     description: "Hold tight..",
    //   });
    // }, 2000);
  }


  showresults(){
    this.results = true;
    // this.http.get('https://app.veloportal.co.za/api/meals').subscribe((res: any) => {
         
    // this.searchdata=res;
    
    //           //console.log(this.searchdata);
    //         });
        
  }
  hideresults(){
    this.results = false;
    // let myHtmlEl = document.getElementsByClassName('resultsList').item(0) as HTMLElement;
    // myHtmlEl.style.display = 'none!important';
 
    
  }
  ngOnInit() {

     // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);

        // Registering Token to FCM 

        this.token =  localStorage.getItem('token');   
        alert(this.token);
        let tok =JSON.parse(this.token) 
        // //console.log(tok.access_token)
        const headers = new HttpHeaders({
          'Authorization': "Bearer"+ " " +tok.access_token
        });
    
        var formData: any = new FormData();
    
            formData.append('fcm_token', token.value);
          
            this.http
              .post(this.baseURL, formData, { headers: headers } )
              .subscribe({
                next: (response) => this.router.navigate(['/home']),
                error: (error) => this.router.navigate(['/error']),
               // error: (error) => //console.log(error),
              });

      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

   

 
    this.cart =  JSON.parse(localStorage.getItem('cart'));

    //console.log(this.cart);
        this.authService.user().subscribe(
          user => {
    
            this.user = user;
            if (this.user.is_first == 1){
    
            }
          }
        );

        this.categoryService.getCategories().subscribe((response:any) => {
          this.data = response;
          this.size = response.length
          this.categories = response
          console.log(this.categories);
          
       
        });
    
        // this.http.get('https://app.veloportal.co.za/api/categories').subscribe((res: any) => {
        //   this.data = res;


        //   this.categories = res;
        //   console.log(this.categories);
        // });

         
        this.http.get('https://app.veloportal.co.za/api/meals').subscribe((res: any) => {
         
this.searchdata=res;

          // //console.log(this.searchdata);
        });
    
    
      }

      ionViewWillEnter() {
        //console.log('Begin async operation');
        this.authService.user().subscribe(
          user => {
            this.user = user;
            // //console.log(this.user);
          }
        );
      }
    
    
      addToCart(product: Product) {
        //console.log(`add ${product.name} to cart`)
        this.animateCSS('jello');
        this.cartService.addProduct(product);
        Swal.fire({
          title: 'Success',
          text:   product.name +" Added to cart!",
          icon: 'success'
        });
      }
      
    
      async openCart() {
        this.animateCSS('bounceOutLeft', true);
    
        const modal = await this.modalCtrl.create({
          component: CartModalPage,
          cssClass: 'cart-modal'
        });
        modal.onWillDismiss().then(() => {
          this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
          this.animateCSS('bounceInLeft');
        });
        modal.present();
      }
    
      // copied from animate.css github page: https://github.com/daneden/animate.css
      animateCSS(animationName, keepAnimated = false) {
        const node = this.fab.nativeElement;
        node.classList.add('animated', animationName);
    
    
        function handleAnimationEnd() {
          if (!keepAnimated) {
            node.classList.remove('animated', animationName);
          }
          node.removeEventListener('animationend', handleAnimationEnd);
        }
        node.addEventListener('animationend', handleAnimationEnd);
      }
    
      doRefresh(ev) {
        setTimeout(() => {
          ev.target.complete();
        }, 50000);
      }
    
      onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 0;
      }

      handleRefresh(event) {
        setTimeout(() => {
          // Any calls to load data go here
          event.target.complete();
        }, 2000);
      };

}
