import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonsService } from '../services/pokemons.service';


@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pokemon-pagination.component.html',
  styleUrls: ['./pokemon-pagination.component.scss']
})
export class PokemonPaginationComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  activePage = 1;
  constructor(private pokemonsService: PokemonsService) { }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadNextPokemons();
    }
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

  get pokemons(): any[] {
    return this.pokemonsService.pokemons;
  }

  loadNextPokemons(): void {
    this.destroySubscriptions();
    this.loading = true;
    this.addSubscription = this.pokemonsService.getNext().subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  loadPreviousPokemons(): void {
    this.destroySubscriptions();
    this.loading = true;
    this.addSubscription = this.pokemonsService.getPrevious().subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  loadOffset(offset: number) : void {
    this.destroySubscriptions();
    this.loading = true;
    this.addSubscription = this.pokemonsService.getOffset(offset).subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  private newPokemonList(response: any) {
    console.log(response);
    this.pokemonsService.pokemons = [];
    this.pokemonsService.next = response.next;
    this.pokemonsService.count = response.count;
    const details = response.results.map((i: any) => this.pokemonsService.getPokemon(i.name));
    this.addSubscription = concat(...details).subscribe((response: any) => {
      this.pokemonsService.pokemons.push(response);
    });
  }

  getPageArray(): Array<any> {
    return this.pokemonsService.pageArray;
  }

  selectPage(number: number) {
    this.activePage = number;
    this.loadOffset(number*100);
  }
}
