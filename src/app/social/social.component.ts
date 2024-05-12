import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SocialDataService } from '../services/session/socialData.service';
import { Forum } from '../interfaces/IForum';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit{
  constructor(private socialData:SocialDataService, public sessionService: SessionService){
    this.socialData.currentForumList.subscribe(forumList => {
      this.forums = forumList;
      this.filtered = this.forums;
      this.forumNames = this.forums.map(forum => forum.name);
    })
  }

  public forums!: Forum[];
  public filtered!: Forum[];

  public forumNames!: string[];


  ngOnInit(): void {
    this.socialData.fetchForums();
  }

  filterForums(event: string[]){
    this.filtered = [];
    event.forEach(name => {
      this.filtered.push(this.forums.find(forum => forum.name == name)!);
    });
  }

  getForumImageUrl(forum_name: string): string {
    return `http://localhost/ProyectoFinal_DAW/HTMLRequests/getForumImage.php?forum_name=${forum_name}.png`;
  }

}
