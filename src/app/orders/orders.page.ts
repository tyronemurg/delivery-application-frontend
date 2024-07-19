import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Product } from './../services/cart.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './../services/env.service';
import { fromArray } from "rxjs/internal/observable/fromArray";
import { filter } from 'rxjs/operators'
import { Order } from '../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

filterOrders: Order;
  orders : any;
  Orders: any;
  Order: any[];
  data = null;
  baseUrl = "https://app.veloportal.co.za/storage/";
  user: User;
  showLocationDetail = false;
  cart = [];
	products = [];
	cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  public segment: string = "list";
  public arr = new Array(10);


  constructor(private http: HttpClient, private orderService: OrdersService, private route: ActivatedRoute, private cartService: CartService, private modalCtrl: ModalController, private authService: AuthService,private env: EnvService ) {

    setTimeout(() => {
      this.orders.push({
        thumbnail: "URL",
        title: "Connecting",
        description: "Hold tight..",
      });
    }, 100000);
   }

  ngOnInit() {

    this.authService.user().subscribe(
      user => {

        this.user = user;
        if (this.user.is_first == 1){
//alert("fuck you");
        }
      }
    );

    this.orderService.getOrders().subscribe((response:any) => {
      this.data = response;
      this.orders = response
      
      const arr = Object.keys(this.orders).map((key) => [key, this.orders[key]]);
      fromArray(arr)
      .pipe(
        filter((val:any) => {
          return val.status == "open";
        })
      )
      .subscribe(val => console.log(val));
    });

    // this.http.get('https://app.veloportal.co.za/api/orders').subscribe((res: any) => {
    //   this.data = res;
    //   this.orders = res.orders;
    //   console.log(this.orders);
    // });

   
  }

  ionViewWillEnter() {
    console.log('Begin async operation');
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }
    );
  }

  ionViewDidEnter() {
    this.orderService.getOrder(this.route.snapshot.params.id).subscribe((response) => {
      this.Orders = response;
      console.log(this.Orders);

    });



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

  doRefresh(ev) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 50;
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }


}
