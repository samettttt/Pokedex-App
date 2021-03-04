import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonsService {

  private url: string = environment.PokeApiUrl + 'pokemon/';
  // caching locally the resources as asked by the API
  private _pokemons: any[] = [];
  private _next: string = '';
  private _previous: string = '';
  private _count: number = 0;
  private _currOffset: number = 0;
  private _pageArray = new Array();

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

  get count(): number {
    return this._count;
  }

  get pageArray(): Array<any> {
    return this._pageArray;
  }

  set next(next: string) {
    this._next = next;
  }

  set previous(previous: string) {
    this._previous = previous;
  }

  set count(count: number) {
    this._count = count;
    this._pageArray = new Array(Math.ceil(this.count / 100));
  }

  set pokemons(pokemons: any[]) {
    this._pokemons = pokemons;
  }
  
  getPokemon(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getNext(): Observable<any> {
    let url = this.next;
    if (url === '') {
      url = `${this.url}?limit=100`
    }
    return this.http.get(url);
  }

  getPrevious(): Observable<any> {
    let url = this.previous;
    if (url === '') {
      url = `${this.url}?limit=100`
    }
    return this.http.get(url);
  }

  getOffset(offset: number): Observable<any> {
    const url = `${this.url}?offset=${offset}&limit=100`
    return this.http.get(url)
  }
}
