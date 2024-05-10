import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { UserDataService } from '../services/session/userData.service';
import { SessionService } from '../services/session/session.service';
import { ImageUploadService } from '../services/image/image-upload.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {

  selectedImage: File | undefined;

  constructor(private imageUploadService: ImageUploadService, private sessionServive: SessionService) { }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedImage) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }

    this.imageUploadService.uploadImage(this.selectedImage, this.sessionServive.getSession()!.id.toString())
      .subscribe(response => {
        console.log('Imagen subida correctamente:', response);
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
      }, error => {
        console.error('Error al subir la imagen:', error);
        // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje de error al usuario
      });
  }
}
