import { Component } from '@angular/core';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [UploadImageComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  showUploadImage: boolean = false;

  toggleSwowUploadImage(){
    this.showUploadImage =!this.showUploadImage;
  }

}
