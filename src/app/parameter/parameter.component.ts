import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../services/session/gameData.service';
import { Data } from '../interfaces/data';
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
    this.gameData.currentGameDataList.subscribe(data => {
      this.dataList = data;
    });
    this.gameData.currentGameDataIndexList.subscribe(data => {
      this.dataIndexList = data;
      this.dataIndex = this.dataIndexList.find(data => data.name === this._route.snapshot.params['param_name'])!;
    });
  }

  public dataList: Data[] = [];
  public dataIndexList: DataIndex[] = [];
  public dataIndex!: DataIndex;
  public param_name:string = this._route.snapshot.params['param_name'];


  ngOnInit(): void {
    this.gameData.fetchGameData(this._route.snapshot.params['param_name'], this._route.snapshot.params['game_id']);
    this.gameData.fetchGameDataIndex(this._route.snapshot.params['game_id']);
  }

}
