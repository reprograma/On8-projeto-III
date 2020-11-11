const form = document.querySelector(".pokedex__forms ");
const input = document.getElementById("nomePkm");
const msgErro = document.getElementById("mensagemErro");
let pokedex = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  msgErro.textContent = "";

  pegarPokemon(input.value)
    criarCards(pokedex);

    if(input.value = ""){
        msgErro.textContent = "Por favor, escolha seu pokemon"
    }
   
   

  input.value = "";
});

function pegarPokemon(pokeName) {
  const baseURL = "https://pokeapi.co/api/v2/";
  const url = `${baseURL}pokemon/${pokeName}`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => console.log(json));
}

const criarCards = (pokedex) => {
  const template = pokedex.reduce((acumulador, pokemon) => {
    return (acumulador += `    
        <div class="card ${pokemon.types[0]}">
        <h2 class="card-title">${pokemon.id} | ${pokemon.name}</h2>
        <img src="${pokemon.img}" alt="${pokemon.name}" class="card-image">
            <p class="card-subtitle" > Type: ${pokemon.types.join(" | ")}</p>
            <p class="card-subtitle" > Height: ${pokemon.height}</p>
            <p class="card-subtitle" > Weight: ${pokemon.weight}</p>
            <p class="card-subtitle" > Abilities: ${pokemon.abilities} </p>
            
         
        </div>
      `);
  }, "");

  templatePokedex(pokedex);
 
};

const templatePokedex = (template) => {
  const pokedex = document.querySelector(".pokedex");
  pokedex.textContent = template;
};
