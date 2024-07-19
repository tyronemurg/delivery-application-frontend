import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = 'https://app.veloportal.co.za/api/';

  constructor() { }
}
