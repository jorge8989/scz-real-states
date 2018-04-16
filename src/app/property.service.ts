import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Property } from './property'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PropertyService {
  private propertiesUrl = 'http://localhost:3010/api/properties';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }
  getProperties(): Promise<Property[]> {
    return this.http.get(this.propertiesUrl)
               .toPromise()
               .then(response => response.json().data as Property[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
