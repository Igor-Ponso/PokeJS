const getPokeId = (pokeId) => `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
const generatePokemonPromises = () =>
  Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokeId(index + 1)).then((response) => response.json())
    );

const generateHtml = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elemTypes = types.map((typeInfo) => typeInfo.type.name);

    accumulator += `
      <li class="card ${elemTypes[0]}">
        <img class="card-image" alt="${name}" src="pokemon_icons/pokemon_icon_${id}_.png" />
        <h2 class="card-title">${name}. ${id}</h2>
        <p class="card-subtitle">${elemTypes.join(" | ")}</p>
      </li>
      `;
    return accumulator;
  }, "");

const insertPokemons = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

//!Must to use Template String to work.
const pokemonPromises = generatePokemonPromises();
Promise.all(pokemonPromises).then(generateHtml).then(insertPokemons);
