import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../services/session/gameData.service';
import { DataIndex } from '../interfaces/dataIndex';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.css'
})
export class ParameterComponent implements OnInit{

constructor(private _route: ActivatedRoute, private gameData:GameDataService){
}

  public parameter: DataIndex[] = [];
  ngOnInit(): void {
    //this.gameData.fetchGameData(this._route.snapshot.params['game_id']);
  }

}
