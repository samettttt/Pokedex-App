import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonPaginationService {
  private _count: number = 0;
  private _pageArray = new Array();
  private _allPokemons: any[] = [];
  constructor() { }

  set count(count: number) {
    this._count = count;
    this._pageArray = new Array(Math.ceil(this.count / 150))
  }

  get count(): number {
    return this._count;
  }

  get pageArray(): Array<any> {
    return this._pageArray;
  }

  get allPokemons(): Array<any> {
    return this._allPokemons;
  }

  set allPokemons(pokemons: Array<any>) {
    this._allPokemons = pokemons;
  }
}
