import { Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../services/game/games.service';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  constructor(private _route: ActivatedRoute, private elementRef: ElementRef) { }

  gamesService: GamesService = inject(GamesService);
  public games: Game[] = this.gamesService.getGamesList();
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
