import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EnvService } from '../services/env.service';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { ModalController, NavController } from '@ionic/angular';



declare var google;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
  isModalOpen4 = false;
  isModalOpen5 = false;
  isModalOpen6 = false;
  @ViewChild('search') searchElementRef: ElementRef;
  user:any;
  token:any;
  latitude :any;
  longitude:any;
  zoom:any;
  ourPlace:any;
  location:any;
  show: boolean;
  locationID:any;
  constructor(public ngZone: NgZone, private env: EnvService, public mapsAPILoader: MapsAPILoader,private http: HttpClient,private router:Router,private authService: AuthService,private navCtrl: NavController, ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {

      this.token =  localStorage.getItem('token');   
      let tok =JSON.parse(this.token) 
      // //console.log(tok.access_token)
      const headers = new HttpHeaders({
        'Authorization': "Bearer"+ " " +tok.access_token
      });
      this.http.get<any>(this.env.API_URL + 'auth/customer/address', { headers: headers }).subscribe(data => {
        this.location = data.locations;
        // //console.log(this.location);
    }) 

      
      }
      else{
        const headers = new HttpHeaders({
          'Authorization': this.token["token_type"]+" "+this.token["access_token"]
        });
        return this.http.get(this.env.API_URL + 'auth/user', { headers: headers })
        .pipe(
          tap(user => {
            return user;
          })
        )
      }

  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }
  setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
  }
  setOpen4(isOpen: boolean) {
    this.isModalOpen4 = isOpen;
  }
  setOpen5(isOpen: boolean) {
    this.isModalOpen5 = isOpen;
  }
 

  getAddresses(){
    
  }

  ionViewWillEnter() {
    // //console.log('Begin async operation');
    localStorage.getItem('token');
    // //console.log(localStorage.getItem('token'));
    this.authService.user().subscribe(
      user => {
        this.user = user;
        // //console.log(this.user);
      }
    );
  }


  
  ngAfterViewInit() {
    this.findAdress();
      }

      findAdress(){
        this.mapsAPILoader.load().then(() => {
             let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
             autocomplete.addListener("place_changed", () => {
               this.ngZone.run(() => {
                 // some details
                 let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
                 this.latitude = place.geometry.location.lat();
                 this.longitude = place.geometry.location.lng();
                 this.zoom = 12;
                 this.ourPlace = place.adr_address
                //  //console.log(place.adr_address);
               });
             });
           });
       }

  radioChecked(id, i){
    this.location.forEach(item=>{
      if(item.id !== id){ 
         item.selected = false;
         this.show = true;
      }else{
         item.selected = true;
         this.show = false;
      } 
    })
  }

  onSubmit(address) {


    this.locationID = address.value.address;
    //get location from iD
    this.http.get('https://app.veloportal.co.za/api/location/'+this.locationID).subscribe((res: any) => {
          this.location = res;
          // //console.log(this.location);
          //calculate distance and order totals
         //Calculate distance
         const pickUpAddress = new google.maps.LatLng(this.location.lat, this.location.long);
        //  //console.log(pickUpAddress);
         // Static dropp address (Pretoria)
         const dropOffAddress = new google.maps.LatLng(-25.7478676, 28.2292712);
//           this.distance = google.maps.geometry.spherical.computeDistanceBetween(pickUpAddress, dropOffAddress);
        

// this.order.location_id = this.locationID;
// this.order.user_id = this.user.id;
// this.order.distance = this.distance;

// localStorage.setItem('order', JSON.stringify(this.order));

this.navCtrl.navigateRoot('/confirmation');
     
        });

           
          }

  //  onSubmit(address) {

  //   this.token =  localStorage.getItem('token');   
  //   let tok =JSON.parse(this.token) 
  //   //console.log(tok.access_token)
  //   const headers = new HttpHeaders({
  //     'Authorization': "Bearer"+ " " +tok.access_token
  //   });

  //   this.authService.user().subscribe(
  //     user => {

  //       this.user = user;
     
  // var formData: any = new FormData();
  //         formData.append('address', this.ourPlace);
  //         formData.append('user_id', this.user.id);
  //         formData.append('lat',this.latitude);
  //         formData.append('long', this.longitude);
  //         formData.append('ataddress', address.value.ataddress);
  //         this.http
  //           .post('https://app.veloportal.co.za/api/auth/customer/address', formData, { headers: headers } )
  //           .subscribe({
  //             next: (response) => this.router.navigate(['/success-add-address']),
  //             error: (error) => this.router.navigate(['/error']),
             
  //           });

  //     }
  //   );

  
           
  //         }

          

            

  }


