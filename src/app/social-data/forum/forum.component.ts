import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { SocialDataService } from '../../services/session/socialData.service';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { Forum } from '../../common/interfaces/IForum';
import { Post } from '../../common/interfaces/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  _route: ActivatedRoute = inject(ActivatedRoute);
  socialData:SocialDataService = inject(SocialDataService);
  sessionService: SessionService = inject(SessionService);
  router: Router = inject(Router);
  constructor(){
    this.socialData.currentPostList.subscribe(postList => {
      this.posts = postList;
      this.filtered = this.posts;
      this.postTitles = this.posts.map(post => post.title);
      console.log(this.postTitles);
    })
  }

  public forum!: Forum;

  public posts!: Post[];
  public filtered!: Post[];

  public postTitles!: string[];


  ngOnInit(): void {
    this.socialData.fetchForums();
    this.socialData.currentForumList.subscribe({
      next: (forumList) => {
        this.forum = forumList.find(forum => forum.id.toString() == this._route.snapshot.params['id'])!;
        this.socialData.fetchPosts(this._route.snapshot.params['id']);
      }
    });
  }

  filterPosts(event: string[]){
    this.filtered = [];
    event.forEach(title => {
      this.filtered.push(this.posts.find(post => post.title == title)!);
    });
  }

  goToPost(event: string){
    this.router.navigateByUrl('forum/' + this.posts.find(post => post.title == event)?.id);
  }
}
