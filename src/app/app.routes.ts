import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { LibraryComponent } from './library/library.component';
import { SocialComponent } from './social/social.component';
import { DeveloperComponent } from './developer/developer.component';
import { ProfileComponent } from './profile/profile.component';
import { GamePageComponent } from './game-page/game-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PostComponent } from './post/post.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ForumComponent } from './forum/forum.component';
import { CreatePostComponent } from './create-post/create-post.component';

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
    path: 'developer',
    component: DeveloperComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'game-page/:game_name',
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
    path: 'forum/:forum_name',
    component: ForumComponent
  },
  {
    path: 'forum/:forum_name/createPost',
    component: CreatePostComponent
  },
  {
    path: 'forum/:forum_name/:post_title',
    component: PostComponent
  },
  {
    path: 'parameter/:parameter_name',
    component: ParameterComponent
  },
];
