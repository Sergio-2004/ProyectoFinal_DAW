import { Component, OnInit, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Game } from '../../common/interfaces/game';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { GameDataService } from '../../services/session/gameData.service';
import { Router } from '@angular/router';

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
      this.horror = this.games.filter(game => game.genres!.split(',').includes('horror'));
      this.action = this.games.filter(game => game.genres!.split(',').includes('action'));
    })
  }
  private router: Router  = inject(Router);

  public games!: Game[];
  public filtered!: Game[];

  public gameNames!: string[];

  public horror: Game[] = [];
  public action: Game[] = [];



  ngOnInit(): void {
    this.gameData.fetchGames();
  }
  public nextGame(games: Game[]):void{
    games.push(games[0]);
    games.splice(0, 1);
  }
  public previousGame(games: Game[]):void{
    games.splice(0, 0, games[games.length - 1]);
    games.pop();
  }

  filterGames(event: string[]){
    this.filtered = [];
    event.forEach(name => {
      this.filtered.push(this.games.find(game => game.name == name)!);
      this.horror = [];
      this.action = [];
    });
  }
  goToGame(event: string){
    this.router.navigateByUrl('game-page/' + event);
  }

  getGameImageUrl(game_name: string): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getGameImage.php?game_name=${game_name}`;
  }
}
