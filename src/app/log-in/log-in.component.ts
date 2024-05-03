import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  constructor(private elementRef: ElementRef, private http: HttpClient){
  }

  sessionService: SessionService = inject(SessionService);

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }


  login(username: string, password: string){
    this.http.get<any>('http://localhost/login.php',  { params: { "username": username, "password": password }})
    .subscribe((response) => {
      console.log(response)
      switch (response.message){
        case "No username by that name":
          break;
        case "Incorrect password":
          break;
        case "Registration successful":
          this.sessionService.setSession(response.user_id);
          break;
        default:
          break;
      }
      alert(response.message);
    });
  }


}
