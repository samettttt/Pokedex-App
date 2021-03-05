import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'personal', component: PersonalListComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'detail/:name', component: PokemonDetailComponent},
  {path: '',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
