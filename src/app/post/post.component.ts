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


  constructor(private _route: ActivatedRoute, private elementRef: ElementRef) { }

  public posts: Post[]= [];

  public post?: Post;

  userSet = true;


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

  postComment(post: Post, comment: string){
    if(!sessionStorage.getItem('user')) {
      return false
    }else{
      this.posts.forEach(Post => {
        if(Post == post && post.comments != undefined){
          Post.comments!.push({
            username: sessionStorage.getItem('user')!,
            content: comment
          });
        }
      });
      return true;
    }
  }

}
