import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDataService } from '../services/session/gameData.service';
import { Data } from '../interfaces/data';
import { DataIndex } from '../interfaces/dataIndex';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [BaseChartDirective],
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

  lineChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as string[],
        label: this._route.snapshot.params['param_name'],
      }
    ]
  }
  loading: boolean = true;
  public dataList: Data[] = [];
  public dataIndexList: DataIndex[] = [];
  public dataIndex!: DataIndex;
  public param_name:string = this._route.snapshot.params['param_name'];


  ngOnInit(): void {
    this.gameData.fetchGameData(this._route.snapshot.params['param_name'], this._route.snapshot.params['game_id']);
    this.gameData.fetchGameDataIndex(this._route.snapshot.params['game_id']);

  }

  getLineChartData(){
    return this.lineChartData = {
      labels: this.dataList.map(data => {return data.player_name}),
      datasets: [
        {
          data: this.dataList.map(data => {return data.value}),
          label: this._route.snapshot.params['param_name'],
        }
      ]
    }
  }

  sortByName() {
    this.dataList.sort((a, b) => {
      if (a.player_name.toLocaleUpperCase() < b.player_name.toLocaleUpperCase()) {
        return -1;
      } else if (a.player_name.toLocaleUpperCase() > b.player_name.toLocaleUpperCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  // Método para ordenar por fecha
  sortByDate() {
    this.dataList.sort((a, b) => {
      const dateA = new Date(a.recorded_date).getTime();
      const dateB = new Date(b.recorded_date).getTime();
      return dateA - dateB;
    });
  }

  // Método para ordenar por valor
  sortByValue() {
    this.dataList.sort((a, b) => {
      const valueA = parseFloat(a.value);
      const valueB = parseFloat(b.value);
      return valueA - valueB;
    });
  }

}
