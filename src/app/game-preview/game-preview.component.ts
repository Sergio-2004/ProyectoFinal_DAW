import { Component, Input } from '@angular/core';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-game-preview',
  standalone: true,
  imports: [],
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.css'
})
export class GamePreviewComponent {
  @Input()
  public game!: Game;
}
