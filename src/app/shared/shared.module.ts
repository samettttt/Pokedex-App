import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';


@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonStatsComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    RouterModule,
  ],
  exports: [
    PokemonCardComponent,
    PokemonStatsComponent
  ]
})
export class SharedModule { }
