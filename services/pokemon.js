import axios from 'axios';
import pokeApiService from './pokemon-service';

const pokemonService = {};

pokemonService.all = () => pokeApiService.get('pokemon?limit=0&offset=0');

pokemonService.getPokemonByName = (name) => pokeApiService.get(`pokemon/${name}`);

pokemonService.getPokemonColor = (id) => pokeApiService.get(`pokemon-color/${id}`);

pokemonService.getPage = (url) => axios.get(url);

export default pokemonService;
