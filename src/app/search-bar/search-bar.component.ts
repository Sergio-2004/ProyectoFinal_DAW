import { Component, EventEmitter, Output } from '@angular/core';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

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
  ];
  public filtered: Game[] = this.games;
  @Output() newItemEvent = new EventEmitter();

  public filterResults(text: string) {
    if (!text) {
      return;
    }
    this.filtered = [];

    this.games.forEach(game => {
      if(game.name.toLowerCase().includes(text.toLowerCase())){
        this.filtered.push(game);
      }
    });
    this.newItemEvent.emit(this.filtered);
  }
}
