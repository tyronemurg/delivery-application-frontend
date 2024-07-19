import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PayFastApi } from '../models/payfastapi';
import { Browser } from '@capacitor/browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-booking',
  templateUrl: './payment-booking.page.html',
  styleUrls: ['./payment-booking.page.scss'],
})
export class PaymentBookingPage implements OnInit {
  registerForm: FormGroup;
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
  guestAmount : any;
  dateTime: any;
  note: any;
  guests: any;
  tableBooking: any;


  constructor(private http: HttpClient,private router:Router,private route: ActivatedRoute,private authService: AuthService,private cartService: CartService,private formBuilder: FormBuilder,) { }

  ngOnInit() {




  }


  registrationForm = this.formBuilder.group({
    guests: ['2', [Validators.required]],
    dateTime: ['', [Validators.required]],
    note: ['', [Validators.required]]
  })

  get myForm() {
    return this.registrationForm.get('guests');
  }
  // form = new FormGroup({
  //   guestAmount: new FormControl('2', Validators.required),
  //   dateTime: new FormControl('', Validators.required),
  //   note: new FormControl('', Validators.required),
   
  //   //nicotine_user: new FormControl('', Validators.required)
  // });
  
  
  // get f(){
  //   return this.form.controls;
  // }


  // onSubmit(){


  //   this.submitted = true;

  //   if (this.form.invalid) {
  //       return;
  //   }

  //   this.guestAmount = localStorage.setItem('guestAmount', JSON.stringify('guestAmount'));
  //   this.dateTime = localStorage.setItem('dateTime', JSON.stringify('dateTime'));
  //   this.note = localStorage.setItem('note', JSON.stringify('note'));
  //   console.log(this.guestAmount);
  //   console.log(this.dateTime);
  //   console.log(this.note);
  //   this.router.navigateByUrl('/home');
  
  
  //   }

  onSubmit() {
    this.submitted = true;
    this.tableBooking = this.registrationForm.value;
    if(!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.tableBooking))
      localStorage.setItem('bookTable', JSON.stringify(this.tableBooking));
      console.log()
      this.router.navigateByUrl('/booking-summary');
     
    }
  }  

}

