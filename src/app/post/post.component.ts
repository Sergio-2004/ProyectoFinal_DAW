import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  public posts: Post[]= [
    {
      title: 'Error con el primer jefe',
      user: 'xXFreeLordXx',
      content: 'Buenas a todos, como podeis ver con el título, ha habido un problema y no puedo pasar del primer jefe, el juego crashea y no se que hacer, un saludo',
      image: '',
      comments:[
        {
          user: 'MyTulip',
          content: 'Me ha pasado lo mismo, ojalá se solucione pronto'
        },
        {
          user: 'MyTulip',
          content: 'Me ha pasado lo mismo, ojalá se solucione pronto'
        }
      ]

    },
    {
      title: 'Fan Art de X Personaje',
      user: 'MyTulip',
      content: 'Hola gente, he hecho este dibujo de mi personaje favorito, espero que os guste',
      image: '../../assets/post_things/fanart.jpg',
      comments:[
        {
          user: 'Fer',
          content: 'Creo que te has equivocado de foro, no tiene nada que ver con el juego'
        },
        {
          user: 'ProAngular',
          content: 'Muy chulo, pero creo que es de otro juego'
        }
      ]

    }
  ];

  public post?: Post;

  constructor(private _route: ActivatedRoute, private elementRef: ElementRef) { }
  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#3b213b';

    this.posts.forEach(post => {
      if(post.title === this._route.snapshot.params['title']){
        this.post = post;
        return;
      }
    });
  }

  userSet = true;

  postComment(post: Post, comment: string){
    if(!sessionStorage.getItem('user')) {
      return false
    }else {
      this.posts.forEach(Post => {
        if(Post == post){
          Post.comments.push({
            user: sessionStorage.getItem('user')!,
            content: comment
          });
        }
      });
      return true;
    }
  }

}
