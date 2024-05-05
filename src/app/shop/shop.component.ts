import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Game } from '../interfaces/game';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { GameDataService } from '../services/session/gameData.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [AppComponent, SearchBarComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  constructor(private elementRef: ElementRef, private gameData:GameDataService){
    this.gameData.currentGameList.subscribe(gameList => {
      this.games = gameList;
      this.filtered = this.games;
    })
  }

  public games!: Game[];
  public filtered!: Game[];



  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
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



}
