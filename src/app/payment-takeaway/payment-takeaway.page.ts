import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PayFastApi } from '../models/payfastapi';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-payment-takeaway',
  templateUrl: './payment-takeaway.page.html',
  styleUrls: ['./payment-takeaway.page.scss'],
})
export class PaymentTakeawayPage implements OnInit {

  order:any;
  cost: any;
  total:any;
  submitted = false;
  user:any;
  token:any;
  ok:true;
  cart: any;
  cartSummary: any;
  cartTotal: any;
  summaryTotal: any;
  show: boolean;
  latitude :any;
  longitude:any;
  zoom:any;
  ourPlace:any;
  location:any;
  locationID:any;
  delivery:any;
  payfast:any;
  paymentUrl:any;
  id = '';
  res : any ;

  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute,private authService: AuthService,private cartService: CartService,) { }

  ngOnInit() {



    this.cartSummary = this.cartService.getCart();
    this.cart = JSON.parse(localStorage.getItem('cart'));
  this.order = JSON.parse(localStorage.getItem('order'));
  this.id = this.route.snapshot.paramMap.get('id');


  }

  getItemTotal(): number {
		return this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0);
	}

  getSummaryTotal(): number {
    this.order = JSON.parse(localStorage.getItem('order'));

   
    this.cartTotal = this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0);
    this.summaryTotal = this.cartTotal;
		return Number(this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0)) + Number(this.total);
	}

  onSubmit(){


    this.token =  localStorage.getItem('token');   
    let tok =JSON.parse(this.token) 
    //console.log(tok.access_token)
    const headers = new HttpHeaders({
      'Authorization': "Bearer"+ " " +tok.access_token
    });
  
    this.authService.user().subscribe(
      user => {
  
               //get cart
         //get order
      
   // this.cost = this.form.value;
    this.cart = localStorage.getItem('cart');
    this.order = JSON.parse(localStorage.getItem('order'));
  
    //console.log(this.cart);
  
  
  
        this.user = user;
     
  var formData: any = new FormData();
  
          formData.append('user_id', this.user.id);
          formData.append('location_id', 82);
          formData.append('cart', this.cart);
          formData.append('distance', 100);
          formData.append('type', 'takeaway');
          this.http
            .post('https://app.veloportal.co.za/api/auth/customer/order', formData, { headers: headers } )
            .subscribe({
              next: (response:any) => {
                //alert(response);
               // this.router.navigate(['/success'])
              //  this.res = response.order;
                this.id = response.order.id;
               console.log(response.order.id);
                   this.payfast = new PayFastApi(  "10004002", "q1cd2rdny4a53", this.id, false );   
                    this.paymentUrl = this.payfast.generateURL();
                    Browser.open({url:this.paymentUrl});
                    Browser.addListener('browserFinished', () => {
  
                      //Check if the current order->status has been update to paid if not redirect to fail and try payment again or cancel
  console.log('Browser Finished!!');
      
  
  
  
             
  this.router.navigate(['/success'])
                    })
                    
                    console.log(this.payfast.generateURL());
  
                  // alert(response);
  
  
  
                    //check if last id = order.id if = then redirect to succeess else error 
               
              },
  
              error: (error) => this.router.navigate(['/error']),
  
             // error: (error) => //console.log(error),
            });
  
      }
    );
  
    
  
    }

}
