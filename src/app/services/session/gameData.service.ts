import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../../common/interfaces/game';
import { HttpClient } from '@angular/common/http';
import {  DataIndex } from '../../common/interfaces/dataIndex';
import { Data } from '../../common/interfaces/data';
import { ImageUploadService } from '../image/image-upload.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private router: Router  = inject(Router);

  private http: HttpClient = inject(HttpClient)
  private imageUploadService: ImageUploadService = inject(ImageUploadService)

  private gameList = new BehaviorSubject<Game[]>([]);
  currentGameList = this.gameList.asObservable();

  private gameDataIndexList = new BehaviorSubject<DataIndex[]>([]);
  currentGameDataIndexList = this.gameDataIndexList.asObservable();

  private gameDataList = new BehaviorSubject<Data[]>([]);
  currentGameDataList = this.gameDataList.asObservable();

  private parameter = new BehaviorSubject<DataIndex[]>([]);
  currentParameter = this.parameter.asObservable();



  fetchGames(){
    this.http.get<Game[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getGameList.php')
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          description: game.description,
          genres: game.genres,
        })))
      });
  }

  fetchLibrary(user_id: number){
    this.http.get<Game[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getLibrary.php', {params: {'user_id': user_id}})
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          description: game.description,
        })))
      });
  }

  fetchDevelopedGames(user_id: number){
    this.http.get<Game[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getDevelopedGames.php', {params: {'user_id': user_id}})
     .subscribe(response => {
        this.gameList.next(response.map(game => ({
          id: game.id,
          name: game.name,
          creator_id: game.creator_id,
          description: game.description,
        })))
      });
  }

  fetchGameData(name: string, game_id: number){
    this.http.get<Data[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getGameData.php', {params: {'name': name, 'game_id': game_id}})
     .subscribe(response => {
        this.gameDataList.next(response.map(data => ({
          player_name: data.player_name,
          recorded_date: data.recorded_date,
          value: data.value,
        })))
      });
  }

  fetchGameDataIndex(game_id: number){
    this.http.get<DataIndex[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getGameDataIndex.php', {params: {'game_id': game_id}})
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
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/createNewDataParameter.php', {params: {'game_id': gameId, 'name': name}})
    .subscribe(response => {
      console.log(response);
     });
  }

  deleteParameter(name: string, gameId: number) {
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/deleteDataParameter.php', {params: {'game_id': gameId, 'name': name}})
    .subscribe(response => {
      console.log(response);
     });
  }

  addToLibrary(gameId: number, userId: number) {
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/addToLibrary.php', {params: {'game_id': gameId, 'user_id': userId}})
    .subscribe(response => {
      this.router.navigateByUrl('library')
     });
  }

  removeFromLibrary(gameId: number, userId: number) {
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/removeFromLibrary.php', {params: {'game_id': gameId, 'user_id': userId}})
    .subscribe(response => {
      console.log(response);
     });
  }

  publishGame(name: string, description: string, creatorId: number, file: File, image: File){
    this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/publishGame.php', {params: {'name':name, 'description':description, 'creator_id': creatorId}})
    .subscribe(response => {
      console.log(response);
      if(file){
        this.uploadGameFile(file, name)
        .subscribe({
          next: (response) => { console.log('Archivos subidos correctamente:', response);
        },
        error: (err) => {
          console.error('Error al subir los archivos:', err);
        }});
      }
      if(image){
        this.imageUploadService.uploadGameImage(image, name)
        .subscribe({
          next: (response) => { console.log('Imagen subida correctamente:', response);
        },
        error: (err) => {
          console.error('Error al subir la imagen:', err);
        }});
      }
      this.router.navigate(['developer']);
    });
  }

  uploadGameFile(file: File, name: string ){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name); // Agregar el atributo "name" al FormData

    return this.http.post<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/saveGameFiles.php', formData);
  }

  deleteGame(gameId: number, gameName: string){
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/removeGame.php', {params: {'game_id': gameId, 'game_name': gameName}})
    .subscribe(response => {
      console.log(response);
    });
  }
}
