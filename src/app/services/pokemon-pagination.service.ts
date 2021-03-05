import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonPaginationService {
  private _count: number = 0;
  private _pageArray = new Array();
  private _allPokemons: any[] = [];
  private _searchPerformed: boolean = false;
  constructor() { }

  get count(): number {
    return this._count;
  }
  
  set count(count: number) {
    this._count = count;
    this._pageArray = new Array(Math.ceil(this.count / 150))
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

  get searchPerformed(): boolean {
    return this._searchPerformed;
  }

  set searchPerformed(bool: boolean) {
    this._searchPerformed = bool;
  }
}
