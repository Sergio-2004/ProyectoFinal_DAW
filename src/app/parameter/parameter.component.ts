import { Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.css'
})
export class ParameterComponent implements OnInit{

  constructor(private _route: ActivatedRoute){}

  dataList= {
    gameName: 'Time Bandit',
    parameters: [
      {
        name: 'playtime',
        data: 20.42,
        dataCount: 200
      },
      {
        name: 'gotSuperSword',
        data: 100,
        dataCount: 200
      },
      {
        name: 'timesDeath',
        data: 857,
        dataCount: 200
      },
    ]
  }

  parameter: any;
  ngOnInit(): void {

    this.dataList.parameters.forEach(parameter => {
      if(parameter.name === this._route.snapshot.params['name']){
        this.parameter = parameter;
        return;
      }
    });
  }

}
