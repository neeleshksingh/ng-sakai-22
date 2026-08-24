import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private apiUrl = 'https://jsonip.com';

  constructor(private http: HttpClient) { }

  getPublicIp(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}