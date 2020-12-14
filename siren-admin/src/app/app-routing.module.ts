import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SearchSirenComponent } from './components/search-siren/search-siren.component';

const routes: Routes = [
  {path: 'rooms', component: RoomsComponent},
  {path: 'data',component: DataComponent},
  {path: 'login', component: LoginComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'searchSiren', component: SearchSirenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
