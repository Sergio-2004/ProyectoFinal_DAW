import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../common/interfaces/post';
import { Forum } from '../../common/interfaces/IForum';
import { Comment } from '../../common/interfaces/comment';
import { ImageUploadService } from '../image/image-upload.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocialDataService {

  http: HttpClient = inject(HttpClient);
  imageUploadService: ImageUploadService = inject(ImageUploadService);
  router: Router = inject(Router);

  private forumList = new BehaviorSubject<Forum[]>([]);
  currentForumList = this.forumList.asObservable();

  private postList = new BehaviorSubject<Post[]>([]);
  currentPostList = this.postList.asObservable();

  private commentList = new BehaviorSubject<Comment[]>([]);
  currentCommentList = this.commentList.asObservable();



  fetchForums(){
    this.http.get<Forum[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getForums.php')
     .subscribe(response => {
        this.forumList.next(response.map(forum => ({
          id: forum.id,
          name: forum.name,
          description: forum.description,
        })))
      });
  }

  fetchPosts(forum_id: number){
    this.http.get<Post[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getPosts.php', {params: {'forum_id': forum_id}})
     .subscribe(response => {
        this.postList.next(response.map(post => ({
          id: post.id,
          title: post.title,
          username: post.username,
          content: post.content,
          hasImage: post.hasImage,
          date: post.date
        })))
      });
  }

  fetchComments(post_id: number){
    this.http.get<Comment[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getComments.php', {params: {'post_id': post_id}})
     .subscribe(response => {
        this.commentList.next(response.map(comment => ({
          username: comment.username,
          content: comment.content,
          date: comment.date
        })))
      });
  }


  postComment(user_id: number, post_id: number, content: string){
    this.http.get<Comment[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/postComment.php', {params: {'user_id': user_id, 'post_id': post_id, 'content': content}})
    .subscribe(response => {
      console.log(response);
      window.location.reload();
      });
    this.fetchComments(post_id);
  }

  postPost(forum_id:number, user_id: number,title: string, content: string, image?: File){
    this.http.get<Post[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/postPost.php', {params: {'forum_id':forum_id, 'user_id':user_id,'title': title, 'content': content, 'has_image': image != null ? 1: 0}})
    .subscribe(response => {
      console.log(response);
      if(!image){
        this.router.navigate(['social/'+forum_id]);
      }else{
        this.imageUploadService.uploadPostImage(image, forum_id, title)
        .subscribe({
          next: (response) => {
            console.log('Imagen subida correctamente:', response);
            this.router.navigate(['social/'+forum_id]);
          }, 
          error: (error) => {
          console.error('Error al subir la imagen:', error);
          }
        });
      }
    });
  }

  postForum(name: string, description: string, image: File){
    this.http.get<Post[]>('http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/postForum.php', {params: {'forum_name':name, 'forum_description':description}})
    .subscribe(response => {
      console.log(response);
      this.imageUploadService.uploadForumImage(image, name)
      .subscribe({
        next: (response) => {
          console.log('Imagen subida correctamente:', response);
          this.router.navigate(['social']);
        }, 
        error: (error) => {
        console.error('Error al subir la imagen:', error);
        }
      });
    });
  }
}
