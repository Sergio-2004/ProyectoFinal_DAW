import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../../interfaces/game';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  constructor(private http: HttpClient) { }

  private gameList = new BehaviorSubject<Game[]>([]);
  currentGameList = this.gameList.asObservable();



  fetchGames(){
    this.http.get<Game[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getGameList.php')
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          game_cover: game.game_cover,
          description: game.description,
        })))
      });
  }

  fetchLibrary(user_id: number){
    this.http.get<Game[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getLibrary.php', {params: {'user_id': user_id}})
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          game_cover: game.game_cover,
          description: game.description,
        })))
      });
  }

  fetchDevelopedGames(user_id: number){
    this.http.get<Game[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getDevelopedGames.php', {params: {'user_id': user_id}})
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          game_cover: game.game_cover,
          description: game.description,
        })))
      });
  }
}
