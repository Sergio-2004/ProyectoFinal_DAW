import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit{
  constructor(private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }

  public games: string[]=[
    'Deliver To Whence You Came',
    'Funny Business',
    'Project Ambrosia',
    'Dark Roast Cafè',
    'Time Bandit',
    'Rising Up'
  ]
}
