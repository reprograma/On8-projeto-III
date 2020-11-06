const form = document.querySelector("form")
const input = document.getElementById("nomePkm")
const carta = document.getElementById("pokedexCaixa")
const subtitulo = document.getElementById("pokedexSubtitle")
const titulo = document.getElementById("pokedexTitle")
const imagemPokemon = document.getElementById("pokedexImg")
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
              
                 
            }
   
            erro.textContent =''
            console.log(response)
            return response.json()
         })
         .then(json => {
            const nomeId = `${json.id}. ${json.name}` 
                
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







/*
const form = document.querySelector("form")
const input = document.getElementById("nomePkm") 
const carta = document.getElementById("pokedexCaixa")
const h2 = document.getElementById("pokedexTitle")
const img = document.getElementById("pokedexImg")
const p = document.getElementById("pokedexSubtitle")
const erro = document.getElementById("mensagemErro")
const baseUrl = "https://pokeapi.co/api/v2/pokemon/"


form.addEventListener("submit",(event) => {
   event.preventDefault()
   if(input.value ==""){
     erro.textContent = "insira um numero ou nome do pokemon"
   } else{

   }
   const pokemon = input.value 
   fetch(baseUrl + pokemon) 
   .then(response => {
    console.log(response)
  return response.json()

})
.then(json => {
    console.log(json)
    const nomeId = `${json.id}. ${json.name}`
    const imgId = json.id
    const types = json.types;

    const arrTypes = types.map(type =>type.type.name)
    const colocandoPiper = arrTypes.join(' |')
    console.log(colocandoPiper)
    console.log(arrTypes[0])

    img.src=`https://pokeres.bastionbot.org/images/pokemon/${imgId}.png`

    h2.textContent = nomeId
    p.textContent = tipo 
    carta.classList.add(`${tipo}`)
})

})
*/