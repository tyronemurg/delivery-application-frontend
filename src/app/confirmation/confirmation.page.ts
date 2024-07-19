import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PayFastApi } from '../models/payfastapi';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import PayFastAPI from "../../../node_modules/payfast-js/lib/index";
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})

export class ConfirmationPage implements OnInit {

  order: any;
  cost: any;
  meters: any;
  km: any;
  kilometers: any;
  total: any;
  submitted = false;
  user: any;
  token: any;
  ok: true;
  cart: any;
  cartSummary: any;
  cartTotal: any;
  summaryTotal: any;
  show: boolean;
  latitude: any;
  longitude: any;
  zoom: any;
  ourPlace: any;
  location: any;
  locationID: any;
  delivery: any;
  payfast: any;
  paymentUrl: any;
  id = '';
  res: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private platform: Platform, private http: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService, private cartService: CartService, ) {}

  ngOnInit() {


      //     if (this.platform.is('android')) {
      //       console.log('android');
      //  } else if (this.platform.is('ios')) {
      //       console.log('ios');
      //  }
      //  else if (this.platform.is('desktop')) {
      //   console.log('desktop');
      // } else {
      //       //fallback to browser APIs or
      //       console.log('The platform is not supported');
      //         } 

      localStorage.getItem('distance');

      this.meters = localStorage.getItem('distance');

      this.km = this.meters / 1000;
      this.cost = this.km * 12;
      this.total = this.cost.toFixed(2);
      this.cartSummary = this.cartService.getCart();
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.order = JSON.parse(localStorage.getItem('order'));
      this.id = this.route.snapshot.paramMap.get('id');

      //console.log(this.order.distance);
      this.cost = this.order.distance * 12;
      this.total = this.cost.toFixed(2);
      ////console.log(this.total);
  }

  getItemTotal(): number {
      return this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0);
  }

  getSummaryTotal(): number {
      this.order = JSON.parse(localStorage.getItem('order'));

      ////console.log(this.order.distance);
      this.km = this.order.distance / 1000;
      this.cost = this.km * 12;
      this.total = this.cost.toFixed(2);
      //console.log(this.total);

      this.cartTotal = this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0);
      this.summaryTotal = this.total + this.cartTotal;
      return Number(this.cartSummary.reduce((i, j) => i + j.price * j.amount, 0)) + Number(this.total);
  }

  onSubmit() {


      this.token = localStorage.getItem('token');
      let tok = JSON.parse(this.token)
      //console.log(tok.access_token)
      const headers = new HttpHeaders({
          'Authorization': "Bearer" + " " + tok.access_token
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
              formData.append('location_id', this.order.location_id);
              formData.append('cart', this.cart);
              formData.append('distance', this.order.distance);
              formData.append('type', 'delivery');
              this.http
                  .post('https://app.veloportal.co.za/api/auth/customer/order', formData, {
                      headers: headers
                  })
                  .subscribe({
                      next: (response: any) => {
                          //alert(response);
                          // this.router.navigate(['/success'])
                          //  this.res = response.order;
                          this.id = response.order.id;
                          console.log(response.order.id);
                          
                          // Payfast outbound
                          

                              if (this.platform.is('android')) {

                                const payfast = new PayFastAPI({ merchant_id: "10004002", merchant_key: "q1cd2rdny4a53", 
                            });
                                payfast.addPaymentDetails({
                                  amount: "4000",
                                  item_name: "Samsung 55' TV"
                                });
                                payfast.addReferenceDetails({
                                  m_payment_id: "12345678",
                                  custom_str1: "asdfgh",
                                  custom_str2: "qwerty"
                                });
                                payfast.returnURL("https://client-apps.co.za/kernel-afrika/shop/clothing/hoodies/hoodie/");
                                payfast.cancelURL("<cancel-page-url>");
                                payfast.notifyURL("<notify-url>");

                                this.paymentUrl = payfast.generateURL()
                          //       this.payfast = new PayFastApi("10004002", "q1cd2rdny4a53", this.id, false);
                          // this.payfast.returnURL = "https://client-apps.co.za/kernel-afrika/shop/clothing/hoodies/hoodie/"
                          // this.paymentUrl = this.payfast.generateURL();

                                Browser.open({
                                  url: this.paymentUrl
                              });

                              Browser.addListener('browserFinished', () => {

                                  //Check if the current order->status has been update to paid if not redirect to fail and try payment again or cancel
                                  console.log('Browser Finished!!');
                                  document.location.href = this.payfast.returnURL;
                                 // this.router.navigate(['/success'])
                                 
                              })

                              } else if (this.platform.is('ios')) {
                                this.payfast = new PayFastApi("10004002", "q1cd2rdny4a53", this.id, false);
                          this.payfast.returnURL = "https://client-apps.co.za/kernel-afrika/shop/clothing/hoodies/hoodie/"
                          this.paymentUrl = this.payfast.generateURL();
                                  alert('ios');
                              }else{
                                this.payfast = new PayFastApi("10004002", "q1cd2rdny4a53", this.id, false);
                          this.payfast.returnURL = "https://client-apps.co.za/kernel-afrika/shop/clothing/hoodies/hoodie/"
                          this.paymentUrl = this.payfast.generateURL();
                                console.log(this.platformId);
                                document.location.href = this.paymentUrl;
                              }

                      },

                      error: (error) => this.router.navigate(['/error']),

                      // error: (error) => //console.log(error),
                  });

          }
      );



  }

}
