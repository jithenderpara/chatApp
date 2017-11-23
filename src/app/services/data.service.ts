import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  private results: any;

  constructor(private _http:Http) {
        console.log("Ajax call")
   }
       private commentsUrl = 'https://jsonplaceholder.typicode.com/posts'; 
       GetPost() {
            //Make the HTTP request:
            return this._http.get(this.commentsUrl).subscribe(data => {
            // Read the result field from the JSON response.
            this.results = data['_body'];
            console.log(this.results)
        });



  }

        GetPostMethod() {
            //Make the HTTP request:
            return this._http.get(this.commentsUrl).map((data:Response) => data.json());
    }
}
