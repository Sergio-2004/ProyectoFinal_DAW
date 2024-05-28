import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { SocialDataService } from '../../services/session/socialData.service';
import { UploadImageComponent } from '../../common/upload-image/upload-image.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [UploadImageComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

_route: ActivatedRoute = inject(ActivatedRoute);
sessionService: SessionService = inject(SessionService);
socialData:SocialDataService = inject(SocialDataService);
router: Router = inject(Router);

  showUploadImage: boolean = false;

  showError: boolean = false;

  selectedImage?: File;


  toggleSwowUploadImage(){
    this.showUploadImage =!this.showUploadImage;
    if(!this.showUploadImage) this, this.selectedImage = undefined;
  }

  submitPost(title: string, content: string){
    if(title != '' && content != ''){
      this.socialData.postPost(this._route.snapshot.params['forum_id'], this.sessionService.getSession()!.id, title, content, this.selectedImage);
      this.router.navigate(['forum/'+this._route.snapshot.params['forum_id']]);
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
