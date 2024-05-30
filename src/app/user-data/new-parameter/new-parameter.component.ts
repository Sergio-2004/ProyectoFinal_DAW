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

  @Input() game!: Game;

  testData(name: string){
    this.gameData.createDataTable(name, this.game.id);
    window.location.reload();
  }
}
