import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  isLoggedIn = false;
  token:any;


  constructor(private httpClient: HttpClient, private env: EnvService ) { }

  getOrders(): Observable<Order[]> {
    if (localStorage.getItem('token')) {

      this.token =  localStorage.getItem('token');   
      let tok =JSON.parse(this.token) 
      console.log(tok.access_token)
      const headers = new HttpHeaders({
        'Authorization': "Bearer"+ " " +tok.access_token
      });
    return this.httpClient.get<Order[]>(this.env.API_URL + 'auth/customer/orders', { headers: headers })
      .pipe(
        tap(Order => console.log(Order)),
        catchError(this.handleError<Order[]>('Get Order', []))
      );
  }else{
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.httpClient.get<Order[]>(this.env.API_URL + 'auth/customer/orders', { headers: headers })
      .pipe(
        tap(Order => console.log(Order)),
        catchError(this.handleError<Order[]>('Get Order', []))
      );
}
  }

  getOrder(id): Observable<Order> {
    if (localStorage.getItem('token')) {

      this.token =  localStorage.getItem('token');   
      let tok =JSON.parse(this.token) 
      console.log(tok.access_token)
      const headers = new HttpHeaders({
        'Authorization': "Bearer"+ " " +tok.access_token
      });
      return this.httpClient.get<Order>(this.env.API_URL + 'auth/customer/orders' + '/' + id, { headers: headers })
      .pipe(
        tap(Order => console.log(Order)),
        catchError(this.handleError<Order>(`Get Order ID id=${id}`))
      );
  }
      
      
      
      else{
        const headers = new HttpHeaders({
          'Authorization': this.token["token_type"]+" "+this.token["access_token"]
        });
        return this.httpClient.get<Order>(this.env.API_URL + 'auth/customer/orders' + '/' + id, { headers: headers })
      .pipe(
        tap(Order => console.log(Order)),
        catchError(this.handleError<Order>(`Get Order ID id=${id}`))
      );
  }
      
  
  }




  // getOrders(): Observable<Order[]> {
  //   return this.httpClient.get<Order[]>(this.env.API_URL + 'orders')
  //     .pipe(
  //       tap(Order => console.log(Order)),
  //       catchError(this.handleError<Order[]>('Get Orders', []))
  //     );
  // }

  // getOrder(id): Observable<Order[]> {
  //   return this.httpClient.get<Order[]>(this.env.API_URL + 'orders' + '/' + id)
  //     .pipe(
  //       tap(Order => console.log(Order)),
  //       catchError(this.handleError<Order[]>(`Get Order ID id=${id}`))
  //     );
  // }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
