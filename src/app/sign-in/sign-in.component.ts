import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  constructor(private elementRef: ElementRef){
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  public notSamePassword: boolean = false;
  sessionService: SessionService = inject(SessionService);
}
