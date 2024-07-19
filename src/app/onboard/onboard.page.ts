import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {

  token:any;
  user:any;
  @Input() nav : boolean;

  constructor(private http: HttpClient,private router:Router,private authService: AuthService,) { }

  ngOnInit() {
    this.nav = false;
  }

  onSubmit(){


    this.token =  localStorage.getItem('token');   
    let tok =JSON.parse(this.token) 
    //console.log(tok.access_token)
    const headers = new HttpHeaders({
      'Authorization': "Bearer"+ " " +tok.access_token
    });
     
  var formData: any = new FormData();
  
          this.http
            .post('https://app.veloportal.co.za/api/auth/customer/onboarding', formData, { headers: headers } )
            .subscribe({
              next: (response) => this.router.navigate(['/home']),
              //error: (error) => this.router.navigate(['/error']),
             // error: (error) => //console.log(error),
            });
  
    }

    skipOnboard(){


      this.token =  localStorage.getItem('token');   
      let tok =JSON.parse(this.token) 
      //console.log(tok.access_token)
      const headers = new HttpHeaders({
        'Authorization': "Bearer"+ " " +tok.access_token
      });
       
    var formData: any = new FormData();
    
            this.http
              .post('https://app.veloportal.co.za/api/auth/customer/onboarding', formData, { headers: headers } )
              .subscribe({
                next: (response) => this.router.navigate(['/home']),
                //error: (error) => this.router.navigate(['/error']),
               // error: (error) => //console.log(error),
              });
    
      }

}
