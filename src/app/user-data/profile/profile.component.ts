import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadImageComponent } from '../../common/upload-image/upload-image.component';
import { SessionInitRequireComponent } from '../../common/session-init-require/session-init-require.component';
import { UserDataService } from '../../services/session/userData.service';
import { SessionService } from '../../services/session/session.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SessionInitRequireComponent, UploadImageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(){
    this.userDataService.currentImageUrl.subscribe(imageUrl => {
      this.imageUrl = imageUrl;
    })
  }
  http: HttpClient = inject(HttpClient);
  userDataService:UserDataService = inject(UserDataService);
  sessionService: SessionService = inject(SessionService);


  selectedFile?: File;
  imageUrl!: string;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getProfileImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getProfileImage.php?fileName=${this.sessionService.getSession()?.id}.png`;
  }

  uploadDescription(description: string){
    this.http.get('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/uploadDescription.php', {params: {'user_id': this.sessionService.getSession()!.id, 'description': description}})
      .subscribe({
        next: (response) => {
          console.log('Description uploaded successfully:', response);
          this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getUserData.php',  { params: { "user_id": this.sessionService.getSession()!.id}})
        .subscribe((response) => {
          console.log(response);
          this.sessionService.setSession(response.user);
        });
      }, error: (error) => {
        console.error('Error uploading description:', error);
      }});
  }

  deleteUser(){
    this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/deleteUser.php', {params: {'user_id': this.sessionService.getSession()!.id}})
      .subscribe(response => {
        console.log('User deleted successfully:', response);
        this.sessionService.closeSession();
      }, error => {
        console.error('Error deleting user:', error);
      });
  }
}
