import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {
  private _personalList: Array<any> = [];
  private _wishList: Array<any> = [];

  constructor(private cookieService: CookieService) { }

  initLists() {
    
  }
}
