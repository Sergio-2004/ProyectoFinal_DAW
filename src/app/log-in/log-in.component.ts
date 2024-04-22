import { Component, ElementRef, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#3b213b';
  }
  setSession(user: string, password: string){
    if(user === "UsuarioDePrueba" && password === "1234"){
      console.log("seted")
      sessionStorage.setItem('user', user);
    }
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


}
