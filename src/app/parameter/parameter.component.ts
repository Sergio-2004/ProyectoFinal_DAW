import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../services/session/gameData.service';
import { Data } from '../interfaces/data';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.css'
})
export class ParameterComponent implements OnInit{

constructor(private _route: ActivatedRoute, private gameData:GameDataService){
  this.gameData.currentGameDataList.subscribe(dataList => {
    this.parameter = dataList.filter( data => data.game_id.toString() === this._route.snapshot.params['game_id'] && data.name.toString() === this._route.snapshot.params['param_name'])!;
  });
}

  public parameter: Data[] = [];
  ngOnInit(): void {
    this.gameData.fetchGameData(this._route.snapshot.params['game_id']);
  }

}
