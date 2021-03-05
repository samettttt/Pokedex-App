import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonsService {

  private url: string = environment.PokeApiUrl + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';
  private _previous: string = '';
  constructor(private http: HttpClient) { }

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  get previous(): string {
    return this._previous;
  }

  set next(next: string) {
    this._next = next;
  }

  set previous(previous: string) {
    this._previous = previous;
  }

  set pokemons(pokemons: any[]) {
    this._pokemons = pokemons;
  }
  
  getPokemon(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getAllPokemons() {
    const url = `${this.url}?limit=1183`
    return this.http.get(url);
  }

  getNext(): Observable<any> {
    let url = this.next;
    if (url === '') {
      url = `${this.url}?limit=150`
    }
    return this.http.get(url);
  }

  getPrevious(): Observable<any> {
    let url = this.previous;
    if (url === '') {
      url = `${this.url}?limit=150`
    }
    return this.http.get(url);
  }

  getOffset(offset: number): Observable<any> {
    const url = `${this.url}?offset=${offset}&limit=150`
    return this.http.get(url)
  }
}
