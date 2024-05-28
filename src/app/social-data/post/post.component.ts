import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SocialDataService } from "../../services/session/socialData.service";
import { SessionService } from "../../services/session/session.service";
import { Post } from "../../common/interfaces/post";
import { Comment } from "../../common/interfaces/comment";


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {


  constructor(){
    this.socialDataService.currentCommentList.subscribe(commentList => {
      this.comments = commentList;
    })
  }

  _route: ActivatedRoute = inject(ActivatedRoute);
  socialDataService:SocialDataService = inject(SocialDataService);
  sessionService:SessionService = inject(SessionService);

  public post!: Post;

  public comments!: Comment[];


  ngOnInit(): void {
    this.socialDataService.fetchPosts(this._route.snapshot.params['forum_id']);
    this.socialDataService.currentPostList.subscribe({
      next: (postList) => {
        this.post = postList.find(post => post.id.toString() == this._route.snapshot.params['post_id'])!;
        this.socialDataService.fetchComments(this._route.snapshot.params['post_id']);
      }
    });
  }

  postComment(content: string){
    if(!this.sessionService.getSession()) {
      console.log(false)
      return false
    }else{
      console.log(true)
      this.socialDataService.postComment(this.sessionService.getSession()!.id,this.post.id, content);
      return true;
    }
  }

  getPostImageUrl(): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getPostImage.php?forum_id=${this._route.snapshot.params['forum_id']}&post_title=${this.post.title}.png`;
  }

}
