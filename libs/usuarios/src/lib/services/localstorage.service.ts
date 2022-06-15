import { Injectable } from '@angular/core';

const TOKEN = 'jwttoken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data){
    localStorage.setItem(TOKEN, data);   
}
  getToken(){
    return localStorage.getItem(TOKEN);
  }
  removeToken(){
    localStorage.removeItem(TOKEN);
  }

}

