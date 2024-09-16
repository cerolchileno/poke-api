let currentPokemonId = 1;

const pokemonNome = document.getElementById('pokemonNome');
const pokemonImagem = document.getElementById('pokemonImagem');
const pokemonTipo = document.getElementById('pokemonTipo');
const pokemonIdInput = document.getElementById('pokemonId');

const anteriorBtn = document.getElementById('anteriorBtn');
const proximoBtn = document.getElementById('proximoBtn');
const procurarBtn = document.getElementById('procurarBtn');

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => updatePokemonInfo(data))
    .catch(() => alert('Pokémon not found!'));
}

function updatePokemonInfo(data) {
  pokemonNome.textContent = capitalize(data.name);
  pokemonImagem.src = data.sprites.front_default;
  pokemonTipo.textContent = 'Type: ' + data.types.map(type => capitalize(type.type.name)).join(', ');
  updateBackgroundColor(data.types[0].type.name);
}

function updateBackgroundColor(type) {
  const colors = {
    fire: 'red', water: 'blue', grass: 'green', electric: 'yellow',
    psychic: 'purple', ice: 'lightblue', dragon: 'orange', dark: 'black',
    fairy: 'pink', normal: 'gray'
  };
  document.body.style.backgroundColor = colors[type] || 'white';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
  
}

proximoBtn.addEventListener('click', () => fetchPokemon(++currentPokemonId));
anteriorBtn.addEventListener('click', () => fetchPokemon(currentPokemonId > 1 ? --currentPokemonId : 1));
procurarBtn.addEventListener('click', () => {
  const id = pokemonIdInput.value;
  if (id) fetchPokemon(id);
});

fetchPokemon(currentPokemonId);
