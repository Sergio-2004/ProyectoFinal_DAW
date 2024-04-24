import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { SessionService } from '../services/session/session.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }
  sessionService: SessionService = inject(SessionService);

  fileName?: any;
  file?: File;


  onSave(event: any){
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        this.file = file;
        console.log(this.file);

        const formData = new FormData();

        formData.append("thumbnail", file);
    }
  }
}
