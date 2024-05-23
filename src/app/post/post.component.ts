import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces/post';
import { SocialDataService } from '../services/session/socialData.service';
import { Comment } from '../interfaces/comment';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {


  constructor(private _route: ActivatedRoute, private socialData:SocialDataService, public sessionService:SessionService){
    this.socialData.currentCommentList.subscribe(commentList => {
      this.comments = commentList;
    })
  }

  public post!: Post;

  public comments!: Comment[];


  ngOnInit(): void {
    this.socialData.fetchPosts(this._route.snapshot.params['forum_id']);
    this.socialData.currentPostList.subscribe({
      next: (postList) => {
        this.post = postList.find(post => post.id.toString() == this._route.snapshot.params['post_id'])!;
        this.socialData.fetchComments(this._route.snapshot.params['post_id']);
      }
    });
  }

  postComment(content: string){
    if(!this.sessionService.getSession()) {
      console.log(false)
      return false
    }else{
      console.log(true)
      this.socialData.postComment(this.sessionService.getSession()!.id,this.post.id, content);
      return true;
    }
  }

  getPostImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getPostImage.php?forum_id=${this._route.snapshot.params['forum_id']}&post_title=${this.post.title}.png`;
  }

}
