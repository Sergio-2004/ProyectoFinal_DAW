import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../interfaces/game';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SearchBarComponent, SessionInitRequireComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private elementRef: ElementRef) { }

  sessionService: SessionService = inject(SessionService);
  public games!: Game[];
  public game!: Game;
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#3b213b';

    this.games.forEach(game => {
      if(game.name === this._route.snapshot.params['name']){
        this.game = game;
        return;
      }
    });
  }

}
