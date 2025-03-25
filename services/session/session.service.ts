import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../common/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

private http: HttpClient = inject(HttpClient);

  setSession(user: User){
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getSession(): User | null{
    if(sessionStorage.getItem('user')){
      return JSON.parse(sessionStorage.getItem('user')!);
    }else{
      return null;
    }
  }

  closeSession(){
    sessionStorage.removeItem("user");
  }
}
