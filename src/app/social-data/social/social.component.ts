import { Component, OnInit, inject } from '@angular/core';
import { SocialDataService } from '../../services/session/socialData.service';
import { SessionService } from '../../services/session/session.service';
import { Forum } from '../../common/interfaces/IForum';
import { SearchBarComponent } from '../../common/search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.css'
})
export class SocialComponent implements OnInit{
  constructor(){
    this.socialDataService.currentForumList.subscribe(forumList => {
      this.forums = forumList;
      this.filtered = this.forums;
      this.forumNames = this.forums.map(forum => forum.name);
    })
  }

  socialDataService:SocialDataService = inject(SocialDataService);
  sessionService: SessionService = inject(SessionService);
  router: Router = inject(Router);

  public forums!: Forum[];
  public filtered!: Forum[];

  public forumNames!: string[];


  ngOnInit(): void {
    this.socialDataService.fetchForums();
  }

  filterForums(event: string[]){
    this.filtered = [];
    event.forEach(name => {
      this.filtered.push(this.forums.find(forum => forum.name == name)!);
    });
  }

  getForumImageUrl(forum_name: string): string {
    return `http://localhost/Betanet_ProyectoFinal_DAW/HTMLRequests/getForumImage.php?forum_name=${forum_name}.png`;
  }


  goToForum(event: string){
    this.router.navigateByUrl('forum/' + this.forums.find(forum => forum.name == event)?.id);
  }
}
