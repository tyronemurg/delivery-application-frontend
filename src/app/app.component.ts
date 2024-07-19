import { Component, OnInit, ViewChild, NgZone,ElementRef } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CartService, Product } from './services/cart.service';
import { CartModalPage } from './cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { TabService} from './services/tab.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {
	PushNotifications,
	PushNotificationSchema,
  } from '@capacitor/push-notifications';
  import { FCM } from '@capacitor-community/fcm';
  import { App, URLOpenListenerEvent } from '@capacitor/app';
  


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
	//Pusher: any = "";
  cart = [];
	products = [];
	cartCount: any;
	cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  isLoggedIn = false;
  token:any;
  nav = false;
  user : any;
  session: any;



  topicName = 'super-awesome-topic';
  remoteToken : any;


  notifications: PushNotificationSchema[] = [];

 


  constructor(private platform: Platform, private zone: NgZone, private cartService: CartService, private modalCtrl: ModalController, public tabs: TabService, public authService: AuthService, private router: Router,) {
    this.initializeApp();
  }


  ngOnInit() {

	this.getToken();
	PushNotifications.addListener('registration', (data) => {
  // alert(JSON.stringify(data));
//   console.log(data);
});
PushNotifications.addListener(
  'pushNotificationReceived',
  (notification: PushNotificationSchema) => {
	// console.log('notification ' + JSON.stringify(notification));
	this.zone.run(() => {
	  this.notifications.push(notification);
	});
  }
);
PushNotifications.requestPermissions().then((response) =>
  PushNotifications.register().then(() => alert(`registered for push`))
);
	

  const currentUser = localStorage.getItem('token');
if (currentUser) {

	this.authService.user().subscribe(
		user => {
  
		  this.user = user;
		  if (this.user.is_first == 1){
			this.router.navigate(['onboard']);
		  }
		  else{
			return true;
			//this.router.navigate(['home']);
			}
		}
	  );
	//console.log(currentUser);
	// authorised so return true
	this.nav = true;
	return true;
}



// not logged in so redirect to login page with the return url
this.router.navigate(['']);
return false;

  }

 
  

  
  // move to fcm demo
  subscribeTo() {
    PushNotifications.register()
      .then((_) => {
        FCM.subscribeTo({ topic: this.topicName })
          .then((r) => alert(`subscribed to topic ${this.topicName}`))
          .catch((err) => console.log(""));
      })
      .catch((err) => alert(JSON.stringify(err)));
  }

  unsubscribeFrom() {
    FCM.unsubscribeFrom({ topic: this.topicName })
      .then((r) => alert(`unsubscribed from topic ${this.topicName}`))
      .catch((err) => console.log(""));

    if (this.platform.is('android')) {
      FCM.deleteInstance();
    }
  }

  getToken() {
    FCM.getToken()
      .then((result) => {
        this.remoteToken = result.token;
        alert(this.remoteToken)
      })
      .catch((err) => console.log(""));
    }

 


  ionViewDidLoad(){


  }

  addToCart(product: Product) {
		console.log(`add ${product.name} to cart`)
		this.animateCSS('jello');
		this.cartService.addProduct(product);
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

  initializeApp() {
		App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
			this.zone.run(() => {
				const domain = 'https://beerswift.app/tabs/tab2';

				const pathArray = event.url.split(domain);
				// The pathArray is now like ['https://devdactic.com', '/details/42']

				// Get the last element with pop()
				const appPath = pathArray.pop();
				if (appPath) {
					this.router.navigateByUrl(appPath);
				}
			});
		});
	}

}
