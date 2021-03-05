import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PokemonListElement } from '../pokemon-list-element';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private _personalList: Array<PokemonListElement> = [];
  private _wishList: Array<PokemonListElement> = [];

  constructor(private cookieService: CookieService) { 
    const jsonPersonal = this.cookieService.get('pokedex-cookie-personalList');
    const jsonWish = this.cookieService.get('pokedex-cookie-wishList');
    console.log(jsonPersonal)
    if (jsonPersonal) {
      this._personalList = JSON.parse(jsonPersonal);
    }
    if (jsonWish) {
      this._wishList = JSON.parse(jsonWish);
    }
  }

  get personalList(): Array<any> {
    return this._personalList;
  }
  
  get wishList(): Array<any> {
    return this._wishList;
  }

  caught() {

  }

  addToWishList(pokemon: PokemonListElement): Array<PokemonListElement> {
    if(!this._wishList.some(p => p.name == pokemon.name) && !this._personalList.some(p => p.name == pokemon.name)) {
      this._wishList.push(pokemon);
      this.saveToCookie('wishList');
    }
    return this.wishList;
  }

  addToPersonalList(pokemon: PokemonListElement): Array<PokemonListElement> {
    if(!this._personalList.some(p => p.name == pokemon.name)) {
      this._personalList.push(pokemon);
      this.saveToCookie('personalList');
    }
    return this.personalList;
  }

  saveToCookie(list: string) {
    let arr = list === 'wishList' ? this.wishList : this.personalList;
    this.cookieService.set(`pokedex-cookie-${list}`, JSON.stringify(arr))
  }


}
