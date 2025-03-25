import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocialDataService } from '../../services/session/socialData.service';

@Component({
  selector: 'app-create-forum',
  standalone: true,
  imports: [],
  templateUrl: './create-forum.component.html',
  styleUrl: './create-forum.component.css'
})
export class CreateForumComponent {

  socialData:SocialDataService = inject(SocialDataService);
  router: Router = inject(Router);

  showError: boolean = false;

  selectedImage?: File;

  submitForum(name: string, description: string){
    if(name != '' && description != '' && this.selectedImage){
      this.socialData.postForum(name, description, this.selectedImage);
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
