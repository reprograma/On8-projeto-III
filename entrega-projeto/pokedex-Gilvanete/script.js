const form = document.querySelector("form")
const input = document.getElementById("nomePkm")
const carta = document.getElementById("pokedexCaixa")
const h2 = document.getElementById("pokedexTitle")
const img = document.getElementById("pokedexImg")
const p = document.getElementById("pokedexSubtitle")
const erro = document.getElementById('mensagemErro')
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

form.addEventListener("submit", (event) => {
    event.preventDefault()
    if (input.value == '') {
        erro.textContent = 'Insira um número ou nome do pokemon';
    } else {
        const pokemons = input.value
        fetch(`${baseUrl}${pokemons}`)
            .then(response => {
                return response.json()
            })
            .then(json => {
                console.log(json)

                const nomeId = `${json.id}. ${json.name}`
                const imgId = json.id
                const tipo = (json.types).map(type => type.type.name)
                img.src = `https://pokeres.bastionbot.org/images/pokemon/${imgId}.png`

                h2.textContent = nomeId
                p.textContent = tipo
                carta.classaList.add(`${tipo}`)
            });

    }


});
