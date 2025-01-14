import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Tower } from 'src/app/models/tower';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
  ) { }


  login(email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        localStorage.setItem('token', JSON.stringify(token))
        this.storage.setItem('token', token)
        .then(
          () => {
            //console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.token =  localStorage.getItem('token');
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  
  register(name: String, email: String, phone_number: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      { name: name, email: email, phone_number: phone_number, password: password }
    )
  }
  
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }


  user() {

    if (localStorage.getItem('token')) {

    this.token =  localStorage.getItem('token');   
    let tok =JSON.parse(this.token) 
    //console.log(tok.access_token)
    const headers = new HttpHeaders({
      'Authorization': "Bearer"+ " " +tok.access_token
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
    
    }
    else{
      const headers = new HttpHeaders({
        'Authorization': this.token["token_type"]+" "+this.token["access_token"]
      });
      return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
    }
  

  }
  

  getData() : Observable<Tower[]>  {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Tower[]>(this.env.API_URL + 'auth/user/towers', { headers: headers });
    
    
  }
  getDatas() : Observable<Tower[]>  {
    
    return this.http.get<Tower[]>(this.env.API_URL + 'towers');
    
    
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}