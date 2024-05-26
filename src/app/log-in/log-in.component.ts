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

  constructor( private http: HttpClient, private data:UserDataService){
  }
  sessionService: SessionService = inject(SessionService);

  ngOnInit(): void {
  }


  logIn(username: string, password: string){
    this.http.get<any>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/logIn.php',  { params: { "username": username, "password": password }})
    .subscribe((response) => {
      console.log(response)
      switch (response.message){
        case "No username by that name":
          break;
        case "Incorrect password":
          break;
        case "Registration successful":
          this.sessionService.setSession(response.user);
          history.back();
          break;
        default:
          break;
      }
      alert(response.message);
    });
  }


}
