const form = document.querySelector("form")
const input = document.getElementById("nomePkm")
const carta = document.getElementById("pokedexCaixa")
const titulo = document.getElementById("pokedexTitle")
const imagemPokemon = document.getElementById("pokedexImg")
const subtitulo = document.getElementById("pokedexSubtitle")
const erro = document.getElementById("mensagemErro")
const baseUrl = "https://pokeapi.co/api/v2/pokemon"

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
   
            // if (json.status != 200) {
            //    imagemPokemon.src = ''
            //     titulo.textContent = ''
            //     subtitulo.textContent = ''
            //     return erro.textContent = 'Pokemon não encontrado' 
   
   
               //const erro2 = document.getElementById("mensagemErro")
               //erro2.textContent = "Voce não digitou o nome do pokemon"
   
            //}
   
            console.log(json)
            const imgId = json.id
            const tipo = (json.types).map(type => type.type.name)
            imagemPokemon.src = `https://pokeres.bastionbot.org/images/pokemon/${imgId}.png`
   
            titulo.textContent = nomeId
            subtitulo.textContent = tipo
            carta.classList.add(`${tipo}`,'card')
            pokedexSubtitle.innerText = tipo.join(' | ')
   
   
         })
   }
  



})
