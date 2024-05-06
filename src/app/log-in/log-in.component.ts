import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';
import { UserDataService } from '../services/session/userData.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [SessionInitRequireComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpClient, private data:UserDataService){
  }
  sessionService: SessionService = inject(SessionService);

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }


  logIn(username: string, password: string){
    this.http.get<any>('http://localhost/ProyectoFinal_DAW/HTMLRequests/logIn.php',  { params: { "username": username, "password": password }})
    .subscribe((response) => {
      console.log(response)
      switch (response.message){
        case "No username by that name":
          break;
        case "Incorrect password":
          break;
        case "Registration successful":
          this.sessionService.setSession(response.user);
          console.log(response.user);
          console.log(this.sessionService.getSession());
          this.sessionService.getImage();
          break;
        default:
          break;
      }
      alert(response.message);
    });
  }


}
