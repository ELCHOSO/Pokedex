import { Controller, Get, Param } from '@nestjs/common';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get(':id')
  getPokemon(@Param() params): Promise<Pokemon> {
    return this.pokemonService.getPokemon(params.id);
  }
}