import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { LibraryComponent } from './library/library.component';
import { SocialComponent } from './social/social.component';
import { DeveloperComponent } from './developer/developer.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigComponent } from './config/config.component';

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
];
