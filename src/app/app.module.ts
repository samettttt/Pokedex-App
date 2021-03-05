import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './header/header.component';
import { PersonalListComponent } from './personal-list/personal-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HomeComponent } from './home/home.component';
import { PokemonPaginationComponent } from './pokemon-pagination/pokemon-pagination.component';
import { PokemonsService } from './services/pokemons.service';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { SharedModule } from './shared/shared.module';
import { PokemonPaginationService } from './services/pokemon-pagination.service';
import { PokemonListService } from './services/pokemon-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalListComponent,
    WishlistComponent,
    HomeComponent,
    PokemonPaginationComponent,
    PokemonDetailComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    PokemonsService,
    PokemonPaginationService,
    PokemonListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
