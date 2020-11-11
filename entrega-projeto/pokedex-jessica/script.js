let input = document.getElementById('nomePkm')
const botao = document.getElementById('btn')
let erro = document.getElementById('mensagemErro')
let caixa = document.getElementById('pokedexCaixa')
let imagemPokemon = document.getElementById('pokedexImg')
let titulo = document.getElementById('pokedexTitle')
let subtitulo = document.getElementById('pokedexSubtitle')
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
 
botao.addEventListener ('click', (e)=>{
    e.preventDefault
    let pokemon = input.value
    if(input.value.trim() == ""){
        erro.textContent = "insira um numero ou nome do pokemon"
    } else {
    fetch (`${baseUrl}/${pokemon}`)
        .then((response) => {
            if(response.status != 200){
                imagemPokemon.src = ''
                titulo.textContent = ''
                subtitulo.textContent = ''
                return erro.textContent = 'Pokemon não encontrado'
            }
            erro.textContent = ''
            console.log(response)
            return response.json()
        })
        .then(json => {
            let nomeId = `${json.id}.${json.name}`

            console.log(json)
            let imagemId = json.id
            let tipo = (json.types).map(type => type.type.name)
            imagemPokemon.src = `https://pokeres.bastionbot.org/images/pokemon/${imagemId}.png`

            titulo.textContent = nomeId
            subtitulo.textContent = tipo
            caixa.classList.add(`${tipo}`, 'card')
            pokedexSubtitle.innerText = tipo.join(' | ')


        })

    }
});

