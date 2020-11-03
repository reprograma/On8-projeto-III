//Nomes de pokemon: https://www.pokemon.com/us/pokedex/
//API: https://pokeapi.co/

//https://pokeapi.co/api/v2/

//console.log(inputPokemon)
//Atenção: a imagem deve ser requisitada em outra API,
//com este link: https://pokeres.bastionbot.org/images/pokemon/${id}.png

const btnPokemon = document.querySelector("#btnBuscar");
const img = document.getElementById("pokedexImg");
const mensagemErro = document.getElementById("mensagemErro");
const H2 = document.getElementById("pokedexTitle");
const p = document.getElementById("pokedexSubtitle");

const pegarDadosAPI = (nome) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((object) => {
      console.log(object.types);
      const types = object.types
      console.log(types.lenght)
      const type1 = object.types[0].type.name;
      
      img.src = `https://pokeres.bastionbot.org/images/pokemon/${object.id}.png`;
      H2.textContent = `${object.order} ${object.name}`;
      p.textContent = `${type1} | `;

      //console.log(object.name)
    });
};

btnPokemon.addEventListener("click", function (event) {
  event.preventDefault();
  const inputPokemon = document.getElementById("nomePkm");
  pegarDadosAPI(inputPokemon.value);
});
