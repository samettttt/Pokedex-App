import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input()
  pokemon: any;

  @Input() reset: any;

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    this.reset();
  }

}
