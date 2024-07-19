import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  data: Product[] = [];
    
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  getProducts(): Product[] {
    this.http.get('https://app.veloportal.co.za/api/categories').subscribe((res: any) => {
      this.data = res;
      //console.log(res);
    });

    return this.data;
  }

  getCart(): Product[] {
    //console.log("this.cart: ", this.cart);
    // if(localStorage.getItem('cart')){
    //   this.cart = JSON.parse(localStorage.getItem('cart'));
    //   return this.cart;
    // }
    return this.cart;
  }

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addProduct(product: Product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
			product.amount = 1;
			this.cart.push(product);
			//console.log(`product ${product.name} pushed to cart`);
		}
		this.cartItemCount.next(this.cartItemCount.value + 1);
  }

	decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}