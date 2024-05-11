import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { Game } from '../interfaces/game';
import { GamePreviewComponent } from '../game-preview/game-preview.component';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { GameDataService } from '../services/session/gameData.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [GamePreviewComponent, SessionInitRequireComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{

  constructor( private gameData:GameDataService){
    this.gameData.currentLibrary.subscribe(library => {
      this.games = library;
      this.selectedGame = this.games[0];
    })
  }

  sessionService: SessionService = inject(SessionService);

  public games: Game[] = [];

  public selectedGame: Game = {} as Game;



  ngOnInit(): void {
            if(this.sessionService.getSession()){
              this.gameData.fetchLibrary(this.sessionService.getSession()!.id);
            }
  }
}
