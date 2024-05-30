import { Component, Input, inject } from '@angular/core';
import { GameDataService } from '../../services/session/gameData.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../common/interfaces/game';

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

  @Input() game!: Game;

  testData(name: string){
    console.log(name);
    this.gameData.createDataTable(name, this.game.id);
    this.router.navigateByUrl('/developer');
  }
}
