import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MealsService } from './../services/meals.service';
import { BehaviorSubject } from 'rxjs';
import { CartService, Product } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  data = null;
  user: User;
  Meals: any;
  baseUrl = "https://app.veloportal.co.za/storage/";

  cart = [];
	products = [];
	cartItemCount: BehaviorSubject<number>;
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  mealID: any= [];
  mealURL: any= [];

  showLocationDetail = false;

  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  categorySlidesVisible = false;

  activeCategory = 0;
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;
  listElements = [];
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;


  constructor(private http: HttpClient, private authService: AuthService,private mealService: MealsService, private cartService: CartService, private modalCtrl: ModalController, private route: ActivatedRoute,private sanitizer:DomSanitizer,
    @Inject(DOCUMENT) private document: Document) { }

    

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.mealURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.mealID);  
     this.http.get('https://client-apps.co.za/ordereat/api/food.json').subscribe((res: any) => {
      this.data = res;
      //console.log(res);
    });

    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${headerHeight}px)`)
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

    ionViewWillEnter() {
    //console.log('Begin async operation');
    this.authService.user().subscribe(
      user => {
        this.user = user;
        //console.log(this.user);
      }
    );
    
  }

    
  ionViewDidEnter() {
    this.mealService.getMeal(this.route.snapshot.params.id).subscribe((response) => {
      this.Meals = response;
      //console.log(this.Meals);

    });



}


  ngAfterViewInit() {
    this.lists.changes.subscribe(_ => {
      this.listElements = this.lists.toArray();
    });
    
  }

  selectCategory(index) {
    const child = this.listElements[index].nativeElement;    
    this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for (let i = 0; i < this.listElements.length; i++) {
      const item = this.listElements[i].nativeElement;
      if (this.isElementInViewport(item)) {
        this.activeCategory = i;
        this.slides.slideTo(i, 1000);
        break;
      }
    }
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}
