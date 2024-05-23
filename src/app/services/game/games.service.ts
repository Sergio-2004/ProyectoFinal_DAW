import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game = new BehaviorSubject({
    name: '',
    description: '',
    src: ''
  });
  currentgame = this.game.asObservable();
  constructor() { }
}
