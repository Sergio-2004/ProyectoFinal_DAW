import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSession(user: string){
    sessionStorage.setItem('user', user);
  }

  getSession(){
    return sessionStorage.getItem('user');
  }

  closeSession(){
    sessionStorage.removeItem("user");
  }

  public notSamePassword = false;

  createUser(user: string, password1:String, password2:string): boolean{
    if(password1 == password2){
      sessionStorage.setItem('user', user);
      return true;
    }else{
      return false;
    }
  }
}
