import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { SocialDataService } from '../services/session/socialData.service';

@Component({
  selector: 'app-create-forum',
  standalone: true,
  imports: [],
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {

  constructor(private socialData:SocialDataService, private router: Router){}

  showError: boolean = false;

  selectedImage?: File;

  submit(name: string, description: string){
    if(name != '' && description != '' && this.selectedImage){
      this.socialData.postForum(name, description, this.selectedImage);
      this.router.navigate(['social']);
    }else{
      this.showError = true;
    }
  }

  checkValidation(title: string, content: string){
    console.log(title != '' && content != '');
    return (title != '' && content != '');
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

}
