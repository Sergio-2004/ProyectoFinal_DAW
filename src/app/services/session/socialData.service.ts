import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../interfaces/post';
import { Forum } from '../../interfaces/IForum';
import { Comment } from '../../interfaces/comment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SocialDataService {
  constructor(private http: HttpClient) { }

  private forumList = new BehaviorSubject<Forum[]>([]);
  currentForumList = this.forumList.asObservable();

  private postList = new BehaviorSubject<Post[]>([]);
  currentPostList = this.postList.asObservable();

  private commentList = new BehaviorSubject<Comment[]>([]);
  currentCommentList = this.commentList.asObservable();



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

  fetchComments(post_id: number){
    this.http.get<Comment[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/getComments.php', {params: {'post_id': post_id}})
     .subscribe(response => {
        this.commentList.next(response.map(comment => ({
          username: comment.username,
          content: comment.content
        })))
      });
  }


  postPost(title: string, content: string, image?: string){
    this.http.get<Post[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/postPost.php', {params: {'username':1,'title': title, 'content': content, 'image': image!}})
    .subscribe(response => {
      });
  }


  postComment(content: string){
    this.http.get<Comment[]>('http://localhost/ProyectoFinal_DAW/HTMLRequests/postComment.php', {params: {'content': content}})
    .subscribe(response => {
      });
  }
}
