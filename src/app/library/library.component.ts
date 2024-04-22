import { Component, ElementRef, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Game } from '../interfaces/game';
import { GamePreviewComponent } from '../game-preview/game-preview.component';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { GamesService } from '../services/game/games.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [GamePreviewComponent, SessionInitRequireComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  sessionService: SessionService = inject(SessionService);
  gamesService: GamesService = inject(GamesService);
  public games: Game[] = this.gamesService.getGamesList();
  public selectedGame: Game = this.games[0];
}
