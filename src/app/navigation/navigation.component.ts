import { Component } from '@angular/core';
import { UserDataService } from '../services/session/userData.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  imageUrl: string = '../../assets/profile.svg';

  constructor(private data:UserDataService) {
    this.data.currentImageUrl.subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    })
  }

}
