import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnInit{

  constructor(){}
  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => console.log(response));
  }

}
