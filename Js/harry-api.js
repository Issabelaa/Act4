const charactersContainer = document.getElementById("charactersContainer");
const characterModal = document.getElementById("characterModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const houseButtons = document.querySelectorAll(".house-buttons button");

async function fetchData(endpoint) {
  try {
    const response = await fetch(`https://hp-api.onrender.com/api/${endpoint}`);
    if (!response.ok) throw new Error("Error al obtener los datos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadCharactersByHouse(house) {
  const characters = await fetchData("characters");
  const filteredCharacters = characters.filter(
    (character) => character.house === house
  );

charactersContainer.innerHTML = "";
  if (filteredCharacters.length === 0) {
    charactersContainer.innerHTML = `<p>No hay personajes disponibles para esta casa.</p>`;
    return;
  }

  filteredCharacters.forEach((character) => {
    const div = document.createElement("div");
    div.className = "character";
    div.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p><strong>${character.name}</strong></p>
    `;
    div.addEventListener("click", () => displayCharacterDetails(character));
    charactersContainer.appendChild(div);
  });
}

function displayCharacterDetails(character) {
  modalContent.innerHTML = `
    <h2>${character.name}</h2>
    <p><strong>Casa:</strong> ${character.house || "No especificada"}</p>
    <p><strong>Ascendencia:</strong> ${character.ancestry || "No especificada"}</p>
    <p><strong>Patronus:</strong> ${character.patronus || "No especificado"}</p>
    <p><strong>Actor:</strong> ${character.actor}</p>
    <p><strong>Fecha de nacimiento:</strong> ${character.dateOfBirth || "No especificada"}</p>
    <img src="${character.image}" alt="${character.name}">
  `;
  characterModal.style.display = "block";
}

closeModal.addEventListener("click", () => {
  characterModal.style.display = "none";
});

houseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const house = button.getAttribute("data-house");
    loadCharactersByHouse(house);
  });
});
