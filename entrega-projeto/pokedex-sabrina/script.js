const form = document.querySelector('form')
const input = document.querySelector('#nomePkm')
const carta = document.getElementById('pokedexCaixa')
const h2 = document.getElementById('pokedexTitle')
const img = document.getElementById('pokedexImg')
const p = document.getElementById('pokedexSubtitle')
const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
const erro = document.getElementById('mensagemErro')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const valorInput = input.value.toLowerCase()
    if (valorInput.trim() == "") {
        carta.innerHTML = ''
        erro.textContent = "Insira um número ou nome de um pokemon."
    }
    else {
        fetch(baseUrl + valorInput)
            .then(response => {
                if (response.status != 200) {
                    carta.innerHTML = ''
                    return erro.textContent = "pokemon não encontrado :("
                }
                erro.textContent = ''
                return response.json()
            })

            .then(json => {
                        // console.log(json);
                        const nome = json.name
                        const id = json.id
                        const arrTipos = (json.types).map(type => type.type.name)

                        // const tipos = arrTipos.join(' | ')

                        // carta.classList.add('card')
                        // carta.classList.add(`${json.types[0].type.name}`)

                        // img.src = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
                        // h2.textContent = `${id}. ${nome}`
                        // p.textContent = tipos

                        // erro.textContent = ""
                        // valorInput = ''
                    })
            .catch (erro => console.error(erro))
                }
                
            })