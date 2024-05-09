import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../interfaces/post';
import { Forum } from '../../interfaces/IForum';

@Injectable({
  providedIn: 'root'
})
export class SocialDataService {
  constructor(private http: HttpClient) { }

  private forumList = new BehaviorSubject<Forum[]>([]);
  currentForumList = this.forumList.asObservable();

  private postList = new BehaviorSubject<Post[]>([]);
  currentPostList = this.postList.asObservable();



  fetchForums(){
    this.http.get<Forum[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getForums.php')
     .subscribe(response => {
        this.forumList.next(response.map(forum => ({
          id: forum.id,
          name: forum.name,
          description: forum.description,
        })))
      });
  }

  fetchPosts(forum_id: number){
    this.http.get<Post[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getPosts.php', {params: {'forum_id': forum_id}})
     .subscribe(response => {
        this.postList.next(response.map(post => ({
          id: post.id,
          title: post.title,
          username: post.username,
          content: post.content
        })))
      });
  }
}
