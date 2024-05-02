import { AuthService } from '../services/auth/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { get } from 'jquery';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {

  constructor(private elementRef: ElementRef){
  }

  sessionService: SessionService = inject(SessionService);

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }


  login(username: string, password: string){
    get('http://localhost/login.php',  { "username": username, "password": password })
    .then((response) => {
      console.log(response)
      switch (response){
        case '{"message":"No username by that name"}':
          alert("No username by that name");
          break;
        case '{"message":"Incorrect password"}':
          alert("Incorrect password");
          break;
        case '{"message":"Registration successful"}':
          alert("Registration successful");
          this.sessionService.setSession(username);
          break;
        default:
          break;
      }
    });
  }


}
