import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces/post';
import { SocialDataService } from '../services/session/socialData.service';
import { Forum } from '../interfaces/IForum';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  constructor(private _route: ActivatedRoute, private elementRef: ElementRef, private socialData:SocialDataService){
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
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#3b213b';
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
}
