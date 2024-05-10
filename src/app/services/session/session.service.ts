import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataService } from './userData.service';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private data:UserDataService) { }

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

  public notSamePassword = false;

  createUser(user: string, password1:String, password2:string): boolean{
    if(password1 == password2){
      sessionStorage.setItem('user', user);
      return true;
    }else{
      return false;
    }
  }

  getImage() {
    if(!this.getSession()) return;

    const user_id = this.getSession()!.id;
    if (user_id === null) {
      console.error('user_id is null');
      return;
    }
    // Realiza la solicitud GET para obtener la imagen
    this.http.get('http://localhost/ProyectoFinal_DAW/HTMLRequests/getPicture.php', { params:{"user_id": user_id}, responseType: 'blob' })
    .subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          //this.data.changeImageUrl(event.target.result);
          this.setSession({
            id: this.getSession()!.id,
            username: this.getSession()!.username,
            description: this.getSession()!.description,
            picture: event.target.result
          });
        };
        reader.readAsDataURL(response);
      },
      error => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }
}
