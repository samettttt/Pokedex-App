import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonPaginationService } from '../services/pokemon-pagination.service';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-pokemon-pagination',
  templateUrl: './pokemon-pagination.component.html',
  styleUrls: ['./pokemon-pagination.component.scss']
})
export class PokemonPaginationComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  subscriptions: Subscription[] = [];
  activePage = 0;
  searchString = '';
  searchPerformed = false;
  
  constructor(private pokemonsService: PokemonsService,
              private paginationService: PokemonPaginationService) { }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadOffset(0);
      this.addSubscription = this.pokemonsService.getAllPokemons().subscribe(response => {
        this.loadAllPokemons(response);
      }, error => console.log('Error Occurred:', error), () => this.loading = false);
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
    this.loading = true;
    this.addSubscription = this.pokemonsService.getNext().subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  loadPreviousPokemons(): void {
    this.loading = true;
    this.addSubscription = this.pokemonsService.getPrevious().subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  loadOffset(offset: number) : void {
    this.loading = true;
    this.addSubscription = this.pokemonsService.getOffset(offset).subscribe(response => {
      this.newPokemonList(response);
    }, error => console.log('Error Occurred:', error), () => this.loading = false);
  }

  private newPokemonList(response: any) {
    this.pokemonsService.pokemons = [];
    this.pokemonsService.next = response.next;
    this.paginationService.count = response.count;
    const details = response.results.map((i: any) => this.pokemonsService.getPokemon(i.name));
    this.addSubscription = concat(...details).subscribe((response: any) => {
      this.pokemonsService.pokemons.push(response);
      this.pokemonsService.pokemons.sort((a, b) => (a.id > b.id) ? 1 : -1)
    });
  }

  private loadAllPokemons(response: any) {
    const details = response.results.map((i: any) => this.pokemonsService.getPokemon(i.name));
    this.addSubscription = concat(...details).subscribe((response: any) => {
      this.paginationService.allPokemons.push(response);
    });
  }

  selectPage(number: number) {
    if(!(number < 0 || number > this.getPageArray().length - 1)) {
      console.log("test")
      this.activePage = number;
      this.loadOffset(number*200);
    }
  }

  getPageArray() {
    return this.paginationService.pageArray;
  }

  search() {
    if(this.checkSearchString()) {
      this.loadOffset(0);
      this.searchPerformed = false;
    } else {
      this.destroySubscriptions();
      this.searchPerformed = true;
      this.pokemonsService.pokemons = [];
      this.pokemonsService.pokemons = this.paginationService.allPokemons.filter(x => x.name.includes(this.searchString) || x.id == parseInt(this.searchString));
    }
  }

  reset() {
    this.destroySubscriptions();
    this.searchString = "";
    this.loadOffset(0);
    this.searchPerformed = false;
    this.activePage = 0;
  }

  getReset() {
    return () => {
      return this.reset();
    }
  }

  checkSearchString(): boolean {
    return !this.searchString || /^\s*$/.test(this.searchString) || this.searchString.length === 0 || !this.searchString.trim()
  }
}
