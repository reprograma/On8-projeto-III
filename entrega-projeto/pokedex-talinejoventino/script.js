const input = document.getElementById('nomePkm')
const form = document.querySelector('form')
const mensagemErro = document.getElementById('mensagemErro')
const pokedexImg = document.querySelector('#pokedexImg')
const namePokemon = document.querySelector('#pokedexTitle')
const typePokemon = document.querySelector('#pokedexSubtitle')
const pokedexCaixa = document.getElementById('pokedexCaixa')
const infoCaixa = document.querySelector('.infoCaixa')


form.addEventListener('submit', event => {
    event.preventDefault();
    pokedex();
})

const pokedex = () => {
    const inputValue = input.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
    fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error (` Que pena o pokemón não foi encontrado | ${response.status}`);
            } else {
               
            response.json() .then(data => {
                imgPokemon(data);
                infoPokemon(data);
            
        })
    }
})

.catch( error => {
    mensagemErro.innerHTML = `${error}`
    mensagemErro.style.backgroundColor = 'rgb(204, 12, 12)';
})

clear(); 


}

imgPokemon = (data) => {
    if (String(data.id).length == 1) {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${data.id}.png`
    } else if (String(data.id).length == 2) {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${data.id}.png`
    } else {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id}.png`
    }

    pokedexCaixa.classList.add( `${data.types[0].type.name}`,'card')
}


infoPokemon = (data) => {
namePokemon.innerHTML = `${data.id}. ${data.name}`
const types = data.types
const arrTypes = types.map(type => type.type.name)
const piper = arrTypes.join(' | ')
typePokemon.innerText = piper;
 

        const height = (data.height * 0.1).toFixed(2)
        const weight = (data.weight * 0.1).toFixed(2)
        
        infoCaixa.innerHTML = `<li class="listStyle">
        Height:
          <p class="cardHabilidades" > ${height} m</p>
        </li>
        <li class="listStyle">
        Weight:
          <p class="cardHabilidades" >${weight} kg</p>
        </li>
        <li class="listStyle">
        Abilities:
          <p class="cardHabilidades" >${data.abilities[0].ability.name}</p>
        </li>`
        
}

const clear = () => {
    input.value = '';
    mensagemErro.innerHTML = '';
    mensagemErro.style.backgroundColor = '';
    pokedexImg.src = '';
    namePokemon.innerHTML = '';
    typePokemon.innerText = '';
    pokedexCaixa.setAttribute('class', '');
    infoCaixa.innerHTML = '';
}