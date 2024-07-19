import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private env: EnvService ) { }


  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.env.API_URL + 'categories')
      .pipe(
        tap(Category => console.log(Category)),
        catchError(this.handleError<Category[]>('Get Categories', []))
      );
  }

  getCategory(id): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.env.API_URL + 'categories' + '/' + id)
      .pipe(
        tap(Category => console.log(Category)),
        catchError(this.handleError<Category[]>(`Get Category ID id=${id}`))
      );
  }

  getCategoryMeals(id): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.env.API_URL + 'categories/meals' + '/' + id)
      .pipe(
        tap(Category => console.log(Category)),
        catchError(this.handleError<Category[]>(`Get Category ID id=${id}`))
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
