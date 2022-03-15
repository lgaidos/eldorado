import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel, DeviceModel } from '../interfaces/interfaces';
import { EndPointService } from './endpoint';

@Injectable({
  providedIn: 'root'
})

export class Services {

  constructor(
    private _http: HttpClient,
    private _endPoint: EndPointService) { }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getDevices(): Observable<DeviceModel[]> {
    let url = this._endPoint.getRestService('device/get');
    return this._http
      .get<any>(url,
        {
          observe: 'response',
          headers: this.getHeaders()
        })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  saveDevice(item: DeviceModel): Observable<any> {
    let url =  this._endPoint.getRestService('device/save');
    return this._http
      .post<any>(url, item,
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

  deleteDevice(deviceId: number): Observable<any> {
    let url =  this._endPoint.getRestService('device/delete/' + deviceId);
    return this._http
      .delete<any>(url,
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

  getCategories(): Observable<CategoryModel[]> {
    let url =  this._endPoint.getRestService('category/get');
    return this._http
      .get<any>(url,
        {
          observe: 'response',
          headers: this.getHeaders()
        })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  saveCategory(item: CategoryModel): Observable<any> {
    let url =  this._endPoint.getRestService('category/save');
    return this._http
      .post<any>(url, item,
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

  deleteCategory(categoryId: number): Observable<any> {
    let url =  this._endPoint.getRestService('category/delete/' + categoryId);
    return this._http
      .delete<any>(url,
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