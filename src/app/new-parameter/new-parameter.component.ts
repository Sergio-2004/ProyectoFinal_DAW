import { Component } from '@angular/core';
import { GameDataService } from '../services/session/gameData.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-parameter',
  standalone: true,
  imports: [],
  templateUrl: './new-parameter.component.html',
  styleUrl: './new-parameter.component.css'
})
export class NewParameterComponent {

  constructor(private gameData:GameDataService, private _route: ActivatedRoute){}
  testData(name: string){
    console.log(name);
    this.gameData.createDataTable(name, this._route.snapshot.params['game_id']);
  }
}
