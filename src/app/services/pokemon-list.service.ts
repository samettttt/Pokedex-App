import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private _personalList: Array<string> = [];
  private _wishList: Array<string> = [];

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

  catch(pokemon: string) {
    if(!this._personalList.some(p => p == pokemon)) {
      this._wishList = this._wishList.filter(p => p !== pokemon);
      this._personalList.push(pokemon);
      this.saveToCookie('wishList');
      this.saveToCookie('personalList');
    }
  }

  addToWishList(pokemon: string): Array<string> {
    if(!this._wishList.some(p => p == pokemon) && !this._personalList.some(p => p == pokemon)) {
      this._wishList.push(pokemon);
      this.saveToCookie('wishList');
    }
    return this.wishList;
  }

  removeFromWishList(pokemon: string): Array<string> {
    if(this._wishList.some(p => p == pokemon)) {
      this._wishList = this._wishList.filter(p => p !== pokemon);
      this.saveToCookie('wishList');
    }
    return this.wishList;
  }

  addToPersonalList(pokemon: string): Array<string> {
    if(!this._personalList.some(p => p == pokemon)) {
      this._personalList.push(pokemon);
      this.saveToCookie('personalList');
    }
    return this.personalList;
  }

  removeFromPersonalList(pokemon: string): Array<string> {
    if(this._personalList.some(p => p == pokemon)) {
      this._personalList = this._personalList.filter(p => p !== pokemon);
      this.saveToCookie('personalList');
    }
    return this.wishList;
  }

  saveToCookie(list: string) {
    let arr = list === 'wishList' ? this.wishList : this.personalList;
    this.cookieService.set(`pokedex-cookie-${list}`, JSON.stringify(arr))
  }
}
