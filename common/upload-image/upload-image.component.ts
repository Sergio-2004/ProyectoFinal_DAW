import { Component, Input, inject } from '@angular/core';
import { ImageUploadService } from '../../services/image/image-upload.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {

  imageUploadService: ImageUploadService = inject(ImageUploadService);
  sessionService: SessionService = inject(SessionService);

  selectedImage: File | undefined;

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedImage) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }

    this.imageUploadService.uploadImage(this.selectedImage, this.sessionService.getSession()!.id.toString())
      .subscribe({
        next: (response) => {
        console.log('Imagen subida correctamente:', response);
        window.location.reload();
        // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        }, 
        error: (error) => {
        console.error('Error al subir la imagen:', error);
        // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        }
      });
  }
}
