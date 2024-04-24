import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { GamesService } from '../services/game/games.service';
import { Game } from '../interfaces/game';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  sessionService: SessionService = inject(SessionService);
  private gamesService: GamesService = inject(GamesService);
  public games: Game[] = this.gamesService.getGamesList();
  public selectedGame: Game = this.games[0];


  dataList= {
    gameName: 'Time Bandit',
    parameters: [
      {
        name: 'playtime',
        data: 20.42,
        dataCount: 200
      },
      {
        name: 'gotSuperSword',
        data: 100,
        dataCount: 200
      },
      {
        name: 'timesDeath',
        data: 857,
        dataCount: 200
      },
    ]
  }
}
