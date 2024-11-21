const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("searchButton");
const pokemonData = document.getElementById("pokemonData");

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();

    const pokemonInfo = {
      nombre: data.name,
      id: data.id,
      altura: data.height / 10,
      peso: data.weight / 10,
      tipos: data.types.map((type) => type.type.name),
      habilidades: data.abilities.map((ability) => ability.ability.name).join(", "),
      imagen: data.sprites.front_default,
      sonido: `https://play.pokemonshowdown.com/audio/cries/${data.name.toLowerCase()}.mp3`,
    };
    displayPokemon(pokemonInfo);
  } catch (error) {
    pokemonData.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function displayPokemon(info) {
  pokemonData.innerHTML = `
    <h2>${info.nombre.toUpperCase()} (#${info.id})</h2>
    <img src="${info.imagen}" alt="${info.nombre}">
    <p><strong>Altura:</strong> ${info.altura} m</p>
    <p><strong>Peso:</strong> ${info.peso} kg</p>
    <p><strong>Tipos:</strong> ${info.tipos.join(", ")}</p>
    <p><strong>Habilidades:</strong> ${info.habilidades}</p>
    ${info.sonido ? `<button id="playSound">Reproducir sonido</button>` : ""}
  `;

 const playSoundButton = document.getElementById("playSound");
  if (playSoundButton) {
    playSoundButton.addEventListener("click", () => {
      const audio = new Audio(info.sonido);
      audio.play();
    });
  }
}

searchButton.addEventListener("click", () => {
  const pokemon = pokemonInput.value.trim();
  if (pokemon) fetchPokemon(pokemon);
});