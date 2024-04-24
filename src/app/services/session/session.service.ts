import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSession(user: string, password: string){
    if(user === "UsuarioDePrueba" && password === "1234"){
      sessionStorage.setItem('user', user);
    }
  }

  getSession(){
    if(sessionStorage.getItem('user')){
      return sessionStorage.getItem('user');
    }else{
      return false;
    }
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
