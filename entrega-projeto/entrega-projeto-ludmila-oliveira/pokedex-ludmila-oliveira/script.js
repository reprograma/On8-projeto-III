// CHAMANDO TAGS PELO DOM----------------------------------------------------

const nomePkm = document.querySelector('#nomePkm');
const form = document.querySelector('form');
const messageErro = document.querySelector('#messageErro');
const pokedexImg = document.querySelector('#pokedexImg');
const pokedexTitle = document.querySelector('#pokedexTitle');
const pokedexSubtitle = document.querySelector('#pokedexSubtitle');
const pokedexBox = document.querySelector('#pokedexBox');
const pokedexList = document.querySelector('#pokedexList');


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
            messageErro.innerHTML = `${error}`
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

    pokedexBox.setAttribute('class', object.types[0].type.name);

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

    pokedexList.innerHTML = `
    <ul id="createPokedex">
        <li class="listaStyle">
        Height:
        <p class="paragrafoStyle">${height} m</p>
        </li>
        <li class="listaStyle">
        Weight:
        <p class="paragrafoStyle">${weight} kg</p>
        </li>
        <li class="listaStyle">
        Abilities:
        <p class="paragrafoStyle">${object.abilities[0].ability.name}</p>
        </li>
    </ul>`

};

// FUNÇÃO PARA LIMPAR OS CAMPOS----------------------------------------------

const clear = () => {
    nomePkm.value = '';
    pokedexImg.src = '';
    pokedexTitle.innerText = '';
    pokedexSubtitle.innerText = '';
    pokedexBox.setAttribute('class', '');
    pokedexList.innerHTML = '';
    messageErro.innerHTML = '';
}