import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Game } from '../../common/interfaces/game';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { GameDataService } from '../../services/session/gameData.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AppComponent, SearchBarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  constructor( private gameData:GameDataService){
    this.gameData.currentGameList.subscribe(gameList => {
      this.games = gameList;
      this.filtered = this.games;
      this.gameNames = this.games.map(game => game.name);
    })
  }

  public games!: Game[];
  public filtered!: Game[];

  public gameNames!: string[];



  ngOnInit(): void {
            this.gameData.fetchGames();
  }
  public nextGame():void{
    this.games.push(this.games[0]);
    this.games.splice(0, 1);
  }
  public previousGame():void{
    this.games.splice(0, 0, this.games[this.games.length - 1]);
    this.games.pop();
  }

  filterGames(event: string[]){
    this.filtered = [];
    event.forEach(name => {
      this.filtered.push(this.games.find(game => game.name == name)!);
    });
  }




}
