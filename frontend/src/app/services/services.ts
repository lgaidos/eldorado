import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoryModel, DeviceModel } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class Services {

  constructor(private _http: HttpClient) { }

  private getHeaders(): any {
    return {
      'Content-Type': 'application/json',
    };
  }

  getDevices(): Observable<DeviceModel[]> {
    let url = 'http://localhost:8080/api/device/get';
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
    let url = "http://localhost:8080/api/device/save";
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
    let url = "http://localhost:8080/api/device/delete/" + deviceId;
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
    let url = 'http://localhost:8080/api/category/get';
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
    let url = "http://localhost:8080/api/category/save";
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
    let url = "http://localhost:8080/api/category/delete/" + categoryId;
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