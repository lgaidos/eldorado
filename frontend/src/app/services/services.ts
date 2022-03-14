import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceModel } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})

export class Services {

  constructor(private _http: HttpClient) { }

  private getHeaders() : any {
    return { 'Content-Type' : 'application/json' }
  }

  getDevice(): Observable<DeviceModel[]> {
    let url = 'http://localhost:8080/api/device/buscar';
    return this._http
        .get<any>( url,
        {
            observe: 'response',
            headers: this.getHeaders()
        })
        .pipe(
            map( res => {
                return res.body;
            })
        );
  }

}