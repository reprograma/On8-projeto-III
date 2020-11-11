//Nomes de pokemon: https://www.pokemon.com/us/pokedex/
//API: https://pokeapi.co/

//https://pokeapi.co/api/v2/

//console.log(inputPokemon)
//Atenção: a imagem deve ser requisitada em outra API,
//com este link: https://pokeres.bastionbot.org/images/pokemon/${id}.png

const form = document.querySelector("form")
const input = document.getElementById("nomePkm")
const carta = document.getElementById("pokedexCaixa")
const titulo = document.getElementById("pokedexTitle")
const imagemPokemon = document.getElementById("pokedexImg")
const subtitulo = document.getElementById("pokedexSubtitle")
const erro = document.getElementById("mensagemErro")
const baseUrl = "https://pokeapi.co/api/v2/pokemon"
const pesoTexto = document.getElementById("peso")


form.addEventListener("submit", (event) => {
   event.preventDefault()
   if (input.value.trim() == "") {
      erro.textContent = "insira um numero ou nome do pokemon"
   } else { 
      const pokemon = input.value
      fetch(`${baseUrl}/${pokemon}`)
         .then(response => {
        
            if (response.status != 200) {
               imagemPokemon.src = ''
                titulo.textContent = ''
                subtitulo.textContent = ''
                return erro.textContent = 'Pokemon não encontrado' 
   
   
               //const erro2 = document.getElementById("mensagemErro")
               //erro2.textContent = "Voce não digitou o nome do pokemon"
   
            }
   
            erro.textContent =''
            console.log(response)
            return response.json()
         })
         .then(json => {
            const nomeId = `${json.id}. ${json.name}` 
            console.log(json)
            // if (json.status != 200) {
            //    imagemPokemon.src = ''
            //     titulo.textContent = ''
            //     subtitulo.textContent = ''
            //     return erro.textContent = 'Pokemon não encontrado' 
   
   
               //const erro2 = document.getElementById("mensagemErro")
               //erro2.textContent = "Voce não digitou o nome do pokemon"
   
            //}
              
            const peso = json.weight
            const imgId = json.id
            const tipo = (json.types).map(type => type.type.name)
            imagemPokemon.src = `https://pokeres.bastionbot.org/images/pokemon/${imgId}.png`
            console.log(json)
            titulo.textContent = nomeId
            subtitulo.textContent = tipo
            pesoTexto.textContent = "Peso: " + peso
            carta.className = ''
            carta.classList.add(`${tipo[0]}`,'card')            
            //card.classList.add(tipo[0])
            pokedexSubtitle.innerText = tipo.join(' | ')
             
   
         })
   }
  



})

