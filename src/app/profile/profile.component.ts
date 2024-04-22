import { Component, ElementRef, OnInit } from '@angular/core';
import { SessionInitRequireComponent } from '../session-init-require/session-init-require.component';

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
  getSession(){
    if(sessionStorage.getItem("user")){
      return sessionStorage.getItem("user");
    }else{
      return false;
    }
  }
  closeSession(){
    sessionStorage.removeItem("user");
  }
}
