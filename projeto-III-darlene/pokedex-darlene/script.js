// CHAMANDO TAGS PELO DOM----------------------------------------------------

const form = document.querySelector('form');
const mensagemErro = document.querySelector('#mensagemErro');
const pokedexImg = document.querySelector('#pokedexImg');
const pokedexTitle = document.querySelector('#pokedexTitle');
const pokedexSubtitle = document.querySelector('#pokedexSubtitle');
const pokedexCaixa = document.querySelector('#pokedexCaixa');
const nomePkm = document.querySelector('#nomePkm')
const listPokedex = document.querySelector('.list-pokedex');


// EVENTO DE CLICK-----------------------------------------------------------

form.addEventListener('submit', e => {
    e.preventDefault();

    createPokemon()
})

// FUNÇÃO PARA CRIAR A REQUISIÇÃO------------------------------------------

const createPokemon = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePkm.value}`)

        .then(response => {

            if (!response.ok) {
                throw new Error(`O pokémon não foi encontrado | erro ${response.status}`)
            } else {

                response.json().then(object => {
                    createImg(object);
                    createInfo(object);
                })
            }
        })
        .catch(error => {
            mensagemErro.innerHTML = `${error}` 
        })

    clear();
}

// FUNÇÃO PARA CRIAR A IMAGEM E SEU BACKGROUND-------------------------------

const createImg = (object) => {
    // Esse if é para tratar as fotos, pois nem todas estão disponiveis na API. Nesse caso foi necessário acessar direto do site oficial, e foi preciso utilizar a função String para contar quantos caracteres tem no id (inserido no input) e assim colocar os zeros caso necessário.

    if (String(object.id).length == 1) {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${object.id}.png`
    } else if (String(object.id).length == 2) {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${object.id}.png`
    } else {
        pokedexImg.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${object.id}.png`
    }

    //pokedexCaixa.setAttribute('class', object.types[0].type.name);
    pokedexCaixa.classList.add(`${object.types[0].type.name}`,'card');

};

// FUNÇÃO PARA CRIAR AS INFORMAÇÕES------------------------------------------

const createInfo = (object) => {

    // ---Criando info adicionais tags existentes no HTML---

    pokedexTitle.innerText = `${object.id}. ${object.name}`

    const types = object.types;
    const arrayTypes = types.map(typeInfo => typeInfo.type.name)

    pokedexSubtitle.innerText = arrayTypes.join(' | ')

    // ---Criando info adicionais sem tags existentes no HTML (fase extra)---

    const height = (object.height * 0.1).toFixed(2);
    const weight = (object.weight * 0.1).toFixed(2);

    listPokedex.innerHTML = `
        <ul id="createPokedex">
        <li class="listaEstilo">
        Height:
        <p class="paragrafoEstilo">${height} m</p>
        </li>
        <li class="listaEstilo">
        Weight:
        <p class="paragrafoEstilo">${weight} kg</p>
        </li>
        <li class="listaEstilo">
        Abilities:
        <p class="paragrafoEstilo">${object.abilities[0].ability.name}</p>
        </li>
        </ul>`

};

// FUNÇÃO PARA LIMPAR OS CAMPOS----------------------------------------------

const clear = () => {
    nomePkm.value = '';
    pokedexImg.src = '';
    pokedexTitle.innerText = '';
    pokedexSubtitle.innerText = '';
    pokedexCaixa.setAttribute('class', '');
    mensagemErro.innerHTML = '';
    listPokedex.innerHTML = '';   
}

