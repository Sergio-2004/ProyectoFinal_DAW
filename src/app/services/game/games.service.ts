import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private game = new BehaviorSubject({
    name: '',
    description: '',
    src: ''
  });
  currentgame = this.game.asObservable();
  constructor() { }

  changeGame(game: Game){
    this.game.next(game);
  }
}
