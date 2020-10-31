let pokedex = []
const form = document.querySelector(".pokedex__forms form")

const getPokemon = async (name) => {
    const baseURL = "https://pokeapi.co/api/v2/"
    let url = ""
  
    url = `${baseURL}pokemon/${name}`

    const response = await fetch(url)

    if (!response.ok) {
        const message = `Pokemon não encontrado`;
        throw new Error(message);
    }

    const json = await response.json()
    return json
};

const addToPokedex = (pokemon) => {
    const pokemonToAdd = {
        id: pokemon.id,
        name: pokemon.name,
        img: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
        types: (pokemon.types).map(type => type.type.name),
        abilities: (pokemon.abilities).map(ability => ability.ability.name),
        height: pokemon.height,
        weight: pokemon.weight
    }

    pokedex.push(pokemonToAdd)
};

const createCards = (pokedex) => {
    const template = pokedex.reduce((acumalador, pokemon) => {
      return (acumalador += `    
        <div class="card ${pokemon.types[0]}">
            <img src="${pokemon.img}" alt="${pokemon.name}" class="card-image">
            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle" >${(pokemon.types).join(" | ")}</p>
        </div>
      `);
    }, "")
    insertPokedexIntoPage(template)
};
  
const insertPokedexIntoPage = (template) => {
    const pokedex = document.querySelector(".pokedex");
    pokedex.innerHTML = template;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const input = document.querySelector("#nomePkm")
    const mensagemErro = document.querySelector("#mensagemErro")
    mensagemErro.textContent = ""

    await getPokemon(input.value)
        .then(pokemon => {
            addToPokedex(pokemon)
            createCards(pokedex)
        }) 
        .catch(error => {
            mensagemErro.textContent = error.message
            return false
        })

    input.value = ""
})