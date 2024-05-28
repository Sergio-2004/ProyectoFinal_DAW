import { Component, inject } from '@angular/core';
import { GameDataService } from '../../services/session/gameData.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-parameter',
  standalone: true,
  imports: [],
  templateUrl: './new-parameter.component.html',
  styleUrl: './new-parameter.component.css'
})
export class NewParameterComponent {

  private gameData:GameDataService = inject(GameDataService);
  private _route: ActivatedRoute = inject( ActivatedRoute );
  private router: Router = inject( Router );

  testData(name: string){
    console.log(name);
    this.gameData.createDataTable(name, this._route.snapshot.params['game_id']);
    this.router.navigateByUrl('/developer');
  }
}
