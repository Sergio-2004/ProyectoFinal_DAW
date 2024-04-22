import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { LibraryComponent } from './library/library.component';
import { SocialComponent } from './social/social.component';
import { DeveloperComponent } from './developer/developer.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigComponent } from './config/config.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent
  },

  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'social',
    component: SocialComponent
  },
  {
    path: 'developer',
    component: DeveloperComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'config',
    component: ConfigComponent
  },
  {
    path: 'game-page/:name',
    component: GamePageComponent
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forum/:name',
    component: ForumComponent
  },
  {
    path: 'forum/:name/:title',
    component: PostComponent
  },
];
