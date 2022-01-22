import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Pokemon } from './pokemon.model'

@Injectable()
export class PokemonService {
  constructor(private httpService: HttpService) { }

  async getPokemon(id): Promise<Pokemon> {
    let pokemon = await this.httpService.get('https://pokeapi.co/api/v2/pokemon/' + id).toPromise()
    let characteristic = await this.httpService.get('https://pokeapi.co/api/v2/characteristic/' + id).toPromise()
    let response = new Pokemon(pokemon.data.name, pokemon.data.sprites.front_default, characteristic.data.descriptions.filter(desc => desc.language.name === 'en')[0].description)
    return response;
  }
}
