import { Component, inject } from '@angular/core';
import { UserDataService } from '../services/session/userData.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  imageUrl: string = '../../assets/profile.svg';

  constructor() {}

  sessionService: SessionService = inject(SessionService);

}
