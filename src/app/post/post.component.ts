import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces/post';
import { SocialDataService } from '../services/session/socialData.service';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {


  constructor(private _route: ActivatedRoute, private elementRef: ElementRef, private socialData:SocialDataService){
    this.socialData.currentCommentList.subscribe(commentList => {
      this.comments = commentList;
    })
  }

  public post!: Post;

  public comments!: Comment[];


  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#3b213b';
    this.socialData.fetchPosts(this._route.snapshot.params['forum_id']);
    this.socialData.currentPostList.subscribe({
      next: (postList) => {
        this.post = postList.find(post => post.id.toString() == this._route.snapshot.params['post_id'])!;
        this.socialData.fetchComments(this._route.snapshot.params['post_id']);
      }
    });
  }

  postComment(content: string){
    if(!sessionStorage.getItem('user')) {
      console.log(false)
      return false
    }else{
      console.log(true)
      return true;
    }
  }

}
