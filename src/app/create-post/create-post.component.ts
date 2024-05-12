import { Component } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { SessionService } from '../services/session/session.service';
import { SocialDataService } from '../services/session/socialData.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [UploadImageComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  constructor(private _route: ActivatedRoute, private sessionService: SessionService, private socialData:SocialDataService, private router: Router){}

  showUploadImage: boolean = false;

  showError: boolean = false;

  selectedImage?: File;


  toggleSwowUploadImage(){
    this.showUploadImage =!this.showUploadImage;
    if(!this.showUploadImage) this, this.selectedImage = undefined;
  }

  submitPost(title: string, content: string){
    if(title != '' && content != ''){
      this.socialData.postPost(this.sessionService.getSession()!.id,this._route.snapshot.params['forum_name'], title, content, this.selectedImage);
      this.router.navigate(['forum/'+this._route.snapshot.params['forum_name']]);
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
