import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonListService } from '../services/pokemon-list.service';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit, OnDestroy {

  pokemons: Array<any> = new Array();
  subscriptions: Subscription[] = [];

  constructor(private pokemonListService: PokemonListService,
              private pokemonService: PokemonsService) { }

  ngOnInit(): void {
    const details = this.pokemonListService.personalList.map((i: any) => this.pokemonService.getPokemon(i));
    this.addSubscription = concat(...details).subscribe((response: any) => {
      console.log(response)
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

  remove(pokemon: string) {
    this.pokemonListService.removeFromPersonalList(pokemon);
  }
}
