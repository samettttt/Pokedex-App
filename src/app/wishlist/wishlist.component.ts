import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonListService } from '../services/pokemon-list.service';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  pokemons: Array<any> = new Array();
  subscriptions: Subscription[] = [];

  constructor(private pokemonListService: PokemonListService,
              private pokemonService: PokemonsService) { }

  ngOnInit(): void {
    const details = this.pokemonListService.wishList.map((i: any) => this.pokemonService.getPokemon(i));
    this.addSubscription = concat(...details).subscribe((response: any) => {
      this.pokemons.push(response);
    });
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  private destroySubscriptions() {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
  }

  set addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  catch(pokemon: string) {
    this.pokemonListService.catch(pokemon);
  }

  remove(pokemon: string) {
    this.pokemonListService.removeFromWishList(pokemon);
  }
}
