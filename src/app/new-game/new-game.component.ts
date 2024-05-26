import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDataService } from '../services/session/gameData.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-create-forum',
  standalone: true,
  imports: [],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  private gameDataService: GameDataService = inject(GameDataService);
  private router: Router  = inject(Router);
  private sessionService: SessionService = inject(SessionService);

  showError: boolean = false;

  selectedFile?: File;
  selectedImage?: File;

  submit(name: string, description: string){
    if(name != '' && description != '' && this.selectedFile && this.selectedImage){
      this.gameDataService.publishGame(name, description, this.sessionService.getSession()!.id, this.selectedFile, this.selectedImage);
    }else{
      this.showError = true;
    }
  }

  checkValidation(title: string, content: string){
    console.log(title != '' && content != '');
    return (title != '' && content != '');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

}
