import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../interfaces/game';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [SearchBarComponent, SessionInitRequireComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})
export class GamePageComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private elementRef: ElementRef) { }

  public games: Game[] = [
    {
      name: 'Deliver To Whence You Came',
      description: "Deliver the meal. Don't become one yourself. An open-ended puzzle platformer based around physics and AI",
      src: '../../assets/games/DTWYC.png'
    },
    {
      name: 'Funny Business',
      description: "Wow! It's your first day at your new job at the Funny Business™ joke factory. Over the course of a short corporate induction, you too can become a comedy genius!! \n Of course, who knows more about comedy (and the teaching thereof) than junior manager Stone Jones~",
      src: '../../assets/games/FB.png'
    },
    {
      name: 'Project Ambrosia',
      description: "From Nectarplasm Studios comes a brand spankin' new experience. PROJECT AMBROSIA is unlike anything you've ever seen, I promise. Currently a WIP (Work in Progress), PROJECT AMBROSIA is an exploration into the mind of Nectar J. Plasm, savant and entrepreneur (and sexy, sexy beast). ",
      src: '../../assets/games/PA.png'
    },
    {
      name: 'Dark Roast Cafè',
      description: "Summon demons to run your cozy little place!",
      src: '../../assets/games/DRC.png'
    },
    {
      name: 'Time Bandit',
      description: "A real-time adventure game with a dark secret. Uncover a capitalist conspiracy and steal back your time.",
      src: '../../assets/games/TB.png'
    },
    {
      name: 'Rising Up',
      description: "Climb the Corporate Ladder... with Your Fists!",
      src: '../../assets/games/RU.png'
    },
  ]

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
  getSession(){
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user')){
      console.log(true);
      return sessionStorage.getItem('user');
    }else{
      console.log(false);
      return false;
    }
  }

}
