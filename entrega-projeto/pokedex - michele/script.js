const form=document.querySelector('.pokedex__forms')
const nomePokemon=document.getElementById('nomePkm')
const menssagemError=document.getElementById('mensagemErro')

const caixa=document.getElementById('pokedexCaixa')
const img=document.getElementById('pokedexImg')
const titulo=document.getElementById('pokedexTitle')
const subTitulo=document.getElementById('pokedexSubtitle')

const pweight=document.createElement('p')
const pHabilidades=document.createElement('p')

form.addEventListener('submit', (event)=>{
    event.preventDefault();
   
    fetch( ` https://pokeapi.co/api/v2/pokemon/${nomePokemon.value}`)
    .then(response=>{
     console.log(response)
        if(response.status !==200){
            limparDados()
            menssagemError.textContent='Pokemon não encontrados!'
            menssagemError.classList.add('mensagem-erro')
        }
        return response.json()
    })
    .then(dados=>{  
        console.log(dados)
        const types=dados.types
        const arrayTipo=types.map(item=>item.type.name)
        titulo.textContent=`${dados.id}.  ${dados.name}`
        subTitulo.textContent=`${arrayTipo.join(' | ')}`

        pweight.textContent=`weight: ${dados.weight}Kg   height: ${dados.height} cm`
        pweight.classList.add('card-subtitle')

        const pegarHabilidades=dados.abilities
        const arrayhabilidade=pegarHabilidades.map(item=>item.ability.name)
        const habilidade=arrayhabilidade.join('  |  ')
        pHabilidades.textContent=`habilidade: ${habilidade}`
        pHabilidades.classList.add('card-subtitle')

        caixa.appendChild(pweight)
        caixa.appendChild(pHabilidades)
              
        caixa.classList.add('card')
        caixa.classList.add(`${arrayTipo[0]}`)
        img.src=`https://pokeres.bastionbot.org/images/pokemon/${dados.id}.png`

        document.getElementById('nomePkm').value=''
        menssagemError.textContent=''        
    })
})
const limparDados=()=>{
    img.src='';
    titulo.textContent='';
    subTitulo.textContent='';
    document.getElementById('pokedexCaixa').value=''
}
