import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }
}
