import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { JsonPipe } from '@angular/common';
import { NgModel, NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
	selector: 'app-cart-modal',
	templateUrl: './cart-modal.page.html',
	// animations: [
    //     trigger('cartBadge', [
    //         state('idle', style({
    //             opacity: '0.3',
    //             transform: 'scale(1)'
    //         })),
    //         state('adding', style({
    //             opacity: '1',
    //             transform: 'scale(1.3)'
    //         })),
    //         transition('idle <=> adding', animate('300ms linear')),
    //         transition('void => *', [
    //             style({transform: 'translateX(200%)'}),
    //             animate('300ms ease-in-out')
    //         ])
    //     ]),
    //     trigger('addButton', [
    //         state('idle', style({
    //             opacity: '0.3'
    //         })),
    //         state('adding', style({
    //             opacity: '1',
    //             fontWeight: 'bold'
    //         })),
    //         transition('idle <=> adding', animate('300ms linear')),
    //         transition('void => *', [
    //             style({transform: 'translateX(200%)'}),
    //             animate('300ms ease-in-out')
    //         ])
    //     ])
    // ],
	styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {




	cart: any;
	orderType: '';
	isSubmitted = false;

	constructor(
		private cartService: CartService,
		private modalCtrl: ModalController,
		private navCtrl: NavController,
		private router: Router
	) {}

	ngOnInit() {
		this.cart = this.cartService.getCart();
		//this.cart = JSON.parse(localStorage.getItem('cart'));
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

	goBack() {
		this.navCtrl.back();
		}

	close(){
		this.modalCtrl.dismiss();
	}

	checkout(form: NgForm) {
		this.isSubmitted = true;
    if(!form.valid) {
      return false;
    } 
	else {

		//Put logic for each type

		//Takeout
		
		if(form.value.orderType == 'takeaway'){
			console.log(form.value.orderType);
			this.router.navigate(['takeaway-summary']);
		}
		else if(form.value.orderType == 'delivery'){
			console.log(form.value.orderType);
			this.router.navigate(['address-selection']);
		}
		else if(form.value.orderType == 'booktable'){
			console.log(form.value.orderType);
			this.router.navigate(['book-table']);
		}
		// else if(form.value.orderType == 'orderbook'){
		// 	console.log(form.value.orderType);
		// 	this.router.navigate(['payment-booking']);
		// }
		else{
			this.router.navigate(['home']);
			}
		
		//console.log(form.value.orderType);

		localStorage.setItem('cart', JSON.stringify(this.cart));
		localStorage.setItem('orderType', JSON.stringify(form.value));
		
	

		// this.router.navigate(['/payment']);
    }
		


	}
}