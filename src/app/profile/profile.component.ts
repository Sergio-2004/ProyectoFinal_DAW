import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private elementRef: ElementRef, private http: HttpClient){}
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
    this.getImage();
  }
  sessionService: SessionService = inject(SessionService);


  selectedFile?: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const user_id = this.sessionService.getSession();
    if (user_id === null) {
      console.error('user_id is null');
      return;
    }

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('picture', this.selectedFile);

    this.http.post('http://localhost/uploadPicture.php', formData)
      .subscribe(response => {
        console.log('Image uploaded successfully:', response);
        this.getImage();
      }, error => {
        console.error('Error uploading image:', error);
      });

      //Quiero que este metodo no se lance hasta que lo de arriba no haya acabado
  }

  imageUrl!: string;

  getImage() {
    const user_id = this.sessionService.getSession();
    if (user_id === null) {
      console.error('user_id is null');
      return;
    }
    // Realiza la solicitud GET para obtener la imagen
    this.http.get('http://localhost/getPicture.php', { params:{"user_id":user_id}, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(response);
      },
      error => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }
}
