import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SessionService } from '../services/session/session.service';

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


}
