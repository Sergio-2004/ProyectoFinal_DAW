import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../interfaces/game';
import { GameDataService } from '../services/session/gameData.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private gameData:GameDataService){
    this.gameData.currentGameList.subscribe(gameList => {
      this.games = gameList;
    })
  }

  @Input() public games: Game[] = [];
  public filtered: Game[] = this.games;

  @Output() newItemEvent = new EventEmitter();

  show: boolean = false;

  public filterResults(text: string) {
    if(!text || text.length == 0){
      this.filtered = [];
      return;
    }
    this.filtered = [];
    this.filtered = this.games.filter(game => game.name.toLocaleLowerCase().startsWith(text.toLocaleLowerCase()));
  }

  searchFiltered(){
    if(this.filtered.length > 0) this.newItemEvent.emit(this.filtered);
  }

  onFocus(){
    this.show = true;
  }

  onBlur(){
    setTimeout(() => this.show = false, 400);
  }
}
