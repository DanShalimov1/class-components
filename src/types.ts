export type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  [key: string]: unknown;
};
