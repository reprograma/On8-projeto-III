const inputnomePkm = document.querySelector('#nomePkm')
const form = document.querySelector('form')
const pErro = document.querySelector('#mensagemErro')
const listaCards = document.querySelector('.pokedex')
const divStatus = document.querySelector('.divStatus')
const statusPokemons = document.querySelector('.statusPokemons')

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
const btn2 = document.createElement('button')
const card = document.createElement('li')
const select = document.createElement('select')
const option0 = document.createElement('option')
const option1 = document.createElement('option')
const option2 = document.createElement('option')
const option3 = document.createElement('option')

form.appendChild(btn2)
divStatus.appendChild(select)
select.appendChild(option0)
select.appendChild(option1)
select.appendChild(option2)
select.appendChild(option3)

btn2.textContent = 'Aleatório'
select.id = 'statusPokemons'
select.name = 'statusPokemons'
option1.textContent = 'Eletric'
option2.textContent = 'Grass'
option3.textContent = 'Water'
option1.value = 'Eletric'
option2.value = 'Grass'
option3.value = 'Water'

option1.style.color = 'gray'
option2.style.color = 'gray'
option3.style.color = 'gray'

form.addEventListener('submit', event => {
    event.preventDefault()
    const nomePkm = inputnomePkm.value.toLowerCase()
    if (!inputnomePkm.value.trim()) {
        card.innerHTML = ''
        pErro.textContent = 'Insira um número ou nome de pokemon'
    } else {
        fetch(`${baseUrl}${nomePkm}`)
            .then(response => {
                if (response.status != 200) {
                    card.innerHTML = ''
                    return pErro.textContent = 'Pokemon não encontrado!'
                }
                pErro.textContent = ''
                return response.json()
            })
            .then(json => {
                const { id, name, types, weight, height } = json
                const arrayMap = types.map(type => type.type.name)
                listaCards.innerHTML = ''
                console.log(json)
                criarCards(id, name, arrayMap, weight, height)
            })
            .catch(erro => console.log(`Deu o seguinte erro: ${erro}`))
        inputnomePkm.value = ''
    }
})

btn2.addEventListener('click', function (event) {
    event.preventDefault()
    for (let i = 0; i <= 19; i++) {
        listaCards.innerHTML = ''
        cardsAleatorios()
    }
})



function criarCards(id, name, types, weight, height) {
    const colocandoPiper = types.join(' | ')
    card.innerHTML = `
        <div class="card ${types[0]}" id="pokedexCaixa">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}" class="card-image" id="pokedexImg">
            <h2 class="card-title" id="pokedexTitle">${id}. ${name}</h2>
            <p class="card-subtitle" id="pokedexSubtitle">${colocandoPiper}</p>
            <p class="card-texto">Weight: ${weight / 10}kg | Height: ${height * 10}cm</p>
        </div>
      `
    listaCards.appendChild(card)
}


function cardsSelect(pokemon) {
    const arraypokemon = pokemon.map(name => name.pokemon.name)
    arraypokemon.forEach(item => {
        fetch(`${baseUrl}${item}`)
            .then(response => response.json())
            .then(json => {
                const { id, name, types, weight, height } = json
                const arrayMap = types.map(type => type.type.name)
                criarCardsAleatorios(id, name, arrayMap, weight, height)
                pErro.textContent = ''
            })
    })
}