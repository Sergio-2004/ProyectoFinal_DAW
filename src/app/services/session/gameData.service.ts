import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../../interfaces/game';
import { HttpClient } from '@angular/common/http';
import {  DataIndex } from '../../interfaces/dataIndex';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  constructor(private http: HttpClient) { }

  private gameList = new BehaviorSubject<Game[]>([]);
  currentGameList = this.gameList.asObservable();

  private gameDataIndexList = new BehaviorSubject<DataIndex[]>([]);
  currentGameDataIndexList = this.gameDataIndexList.asObservable();

  private parameter = new BehaviorSubject<DataIndex[]>([]);
  currentParameter = this.parameter.asObservable();



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

  fetchGameData(user_id: number){
    /*
    this.http.get<Data[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getGameData.php', {params: {'game_id': user_id}})
     .subscribe(response => {
        this.gameDataList.next(response.map(data => ({
          id: data.id,
          name: data.name,
          value: data.value,
          game_id: data.game_id,
          player_id: data.player_id,
          recorded_date: data.recorded_date,
        })))
      });
      */
  }

  fetchDataIndex(user_id: number){
    this.http.get<DataIndex[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getDataIndex.php', {params: {'game_id': user_id}})
     .subscribe(response => {
        this.gameDataIndexList.next(response.map(data => ({
          id: data.id,
          name: data.name,
          game_id: data.game_id,
          table_name: data.table_name
        })))
      });
  }

  createDataTable(name: string, gameId: number) {
    this.http.get<DataIndex[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/createNewDataParameter.php', {params: {'game_id': gameId, 'name': name}})
    .subscribe(response => {
      console.log(response);
     });
  }
}
