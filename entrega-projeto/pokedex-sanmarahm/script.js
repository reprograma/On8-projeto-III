//POKEDEX
// API https://pokeapi.co/
// API Image https://pokeres.bastionbot.org/images/pokemon/${id}.png

const form = document.querySelector('form');
const input = document.querySelector('#nomePkm');
const errorMessage = document.querySelector('#mensagemErro');

const pokeBox = document.querySelector('#pokedexCaixa');
const pokeImg = document.querySelector('#pokedexImg');
const pokeTitle = document.querySelector('#pokedexTitle');
const pokeSub = document.querySelector('#pokedexSubtitle');


form.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`)
    .then((response) => response.json())
    .then((json)=>{
      const pokemon = json.pokemon;
      const id = json.id;
      pokeImg.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      pokeTitle.textContent = `${id}. ${pokemon}`;
    }) 
})



// types: (pokemon.types).map(type => type.type.name)
