import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/categories.service';
import { BehaviorSubject } from 'rxjs';
import { CartService, Product } from '../services/cart.service';
import { ModalController, NavController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.page.html',
  styleUrls: ['./category-single.page.scss'],
})
export class CategorySinglePage implements OnInit {

  Categories: any;
  Meals: any;
  catID: any= [];
  catURL: any= [];
  baseUrl = "https://app.veloportal.co.za/storage/";

  cart = [];
	products = [];
	cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  showLocationDetail = false;

  constructor(private categoryService: CategoryService, private cartService: CartService, private navCtrl: NavController, private modalCtrl: ModalController, private route: ActivatedRoute,private sanitizer:DomSanitizer,) { }

  ngOnInit() {

    this.catURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.catID);  
  }

  addToCart(product: Product) {
		//console.log(`add ${product.name} to cart`)
		//this.animateCSS('jello');
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

  
  ionViewDidEnter() {
    this.categoryService.getCategory(this.route.snapshot.params.id).subscribe((response) => {
      this.Categories = response;
      //console.log(this.Categories);

    });

    this.categoryService.getCategoryMeals(this.route.snapshot.params.id).subscribe((response) => {
      this.Meals = response;
      //console.log(this.Meals);

    });


}

goBack() {
  this.navCtrl.back();
  }

}
