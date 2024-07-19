import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private httpClient: HttpClient, private env: EnvService ) { }


  getMeals(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.env.API_URL + 'meals')
      .pipe(
        tap(Meal => console.log(Meal)),
        catchError(this.handleError<Meal[]>('Get Meals', []))
      );
  }

  getMeal(id): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.env.API_URL + 'meals' + '/' + id)
      .pipe(
        tap(Meal => console.log(Meal)),
        catchError(this.handleError<Meal[]>(`Get Meal ID id=${id}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
