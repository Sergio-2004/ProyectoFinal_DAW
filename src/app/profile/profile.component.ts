import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../services/session/userData.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private elementRef: ElementRef, private http: HttpClient, private data:UserDataService){
    this.data.currentImageUrl.subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    })
  }

  sessionService: SessionService = inject(SessionService);


  selectedFile?: File;
  imageUrl!: string;

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
    this.sessionService.getImage();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const user_id = this.sessionService.getSession()!.id;
    if (user_id === null) {
      console.error('user_id is null');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', user_id.toString());
    formData.append('picture', this.selectedFile);

    this.http.post('http://localhost/ProyectoFinal_DAW/HTMLRequests/uploadPicture.php', formData)
      .subscribe(response => {
        console.log('Image uploaded successfully:', response);
        this.sessionService.getImage();
      }, error => {
        console.error('Error uploading image:', error);
      });

      //Quiero que este metodo no se lance hasta que lo de arriba no haya acabado
  }

  uploadDescription(){

  }
}
