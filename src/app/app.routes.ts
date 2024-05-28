import { Routes } from '@angular/router';
import { ShopComponent } from './store/shop/shop.component';
import { DeveloperComponent } from './user-data/developer/developer.component';
import { LogInComponent } from './user-data/log-in/log-in.component';
import { ParameterComponent } from './user-data/parameter/parameter.component';
import { NewParameterComponent } from './user-data/new-parameter/new-parameter.component';
import { NewGameComponent } from './user-data/new-game/new-game.component';
import { SocialComponent } from './social-data/social/social.component';
import { LibraryComponent } from './user-data/library/library.component';
import { ProfileComponent } from './user-data/profile/profile.component';
import { GamePageComponent } from './store/game-page/game-page.component';
import { SignInComponent } from './user-data/sign-in/sign-in.component';
import { ForumComponent } from './social-data/forum/forum.component';
import { CreatePostComponent } from './social-data/create-post/create-post.component';
import { PostComponent } from './social-data/post/post.component';
import { CreateForumComponent } from './social-data/create-forum/create-forum.component';

export const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
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
    path: 'social/create_forum',
    component: CreateForumComponent
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
    path: 'forum/:id',
    component: ForumComponent
  },
  {
    path: 'forum/:forum_id/create_post',
    component: CreatePostComponent
  },
  {
    path: 'forum/:forum_id/:post_id',
    component: PostComponent
  },
  {
    path: 'parameter/:game_id/:param_name',
    component: ParameterComponent
  },
  {
    path: 'new-parameter/:game_id',
    component: NewParameterComponent
  },
  {
    path: 'new-game',
    component: NewGameComponent
  },
];
