import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CollectusersService {
  
  header = new Headers();
  public setHeader: any;
  
  constructor(private http: HttpClient) {
    this.header.append('Content-Type', 'application/json');
    this.setHeader = {headers: this.header};
  }
  getOnlineData(){
    return this.http.get('https://randomuser.me/api/?results=10', this.setHeader);
  }
  getCachedData(){
    return JSON.parse(localStorage.getItem('users'));
  }
}
