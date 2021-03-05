import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonListService } from '../services/pokemon-list.service';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon: any;
  subscription: Subscription = new Subscription();
  loaded: boolean = false;

  constructor(
    private pokemonService: PokemonsService,
    private pokemonListService: PokemonListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.pokemonService.getPokemon("" + this.route.snapshot.paramMap.get('name'))
      .subscribe((p: any) => {
        this.pokemon = p;
        this.loaded = true;
        console.log(p);
      })
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  addToWishlist() {
    this.pokemonListService.addToWishList(this.pokemon.name);
  }

  addToPersonallist() {
    this.pokemonListService.addToPersonalList(this.pokemon.name);
  }

}
