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

  public posts = [
    {
      title: 'Error con el primer jefe',
      user: 'xXFreeLordXx',
      content: 'Buenas a todos, como podeis ver con el título, ha habido un problema y no puedo pasar del primer jefe, el juego crashea y no se que hacer, un saludo',
      image: '',
      comments: [
        {
          user: 'MyTulip',
          content: 'Me ha pasado lo mismo, ojalá se solucione pronto'
        },
        {
          user: 'The_P_Destroyer',
          content: 'A mi me ha pasado también, el bug está relacionado con los ajustes de brillo, ni idea de por que crashea, pero lo arreglarán pronto'
        },
      ]
    },
    {
      title: 'Fan Art de X Personaje',
      user: 'MyTulip',
      content: 'Hola gente, he hecho este dibujo de mi personaje favorito, espero que os guste',
      image: '',
      comments: [
        {
          user: 'Fer',
          content: 'Creo que te has equivocado de foro, no tiene nada que ver con el juego'
        },
        {
          user: 'Angular_Pro',
          content: 'Es muy bonito, pero no es de este juego lol'
        },
      ]
    }
  ];

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
