import { Component, ElementRef, OnInit } from '@angular/core';

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

  getSession(){
    console.log(sessionStorage.getItem('user'));
    if(sessionStorage.getItem('user')){
      console.log(true);
      return sessionStorage.getItem('user');
    }else{
      console.log(false);
      return false;
    }
  }
  createUser(user: string, password1: string,  password2: string){
    sessionStorage.setItem('user', user);
  }
}
