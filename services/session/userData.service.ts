import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private imageUrl = new BehaviorSubject('../../assets/profile.svg');
  currentImageUrl = this.imageUrl.asObservable();
  private user = new BehaviorSubject({
    id: '',
    username: '',
    description: ''
  });
  currentUser = this.user.asObservable();

  changeImageUrl(imageUrl: string){
    this.imageUrl.next(imageUrl);
  }
}
