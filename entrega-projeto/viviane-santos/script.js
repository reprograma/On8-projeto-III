
const botao = document. getElementById('buttonPkm');
const input= document.getElementById('nomePkm');
const img = document.getElementById('pokedexImg');
const h2 = document.querySelector('#pokedexTitle');
const p = document.querySelector('#pokedexSubtitle');
const carta = document.getElementById('pokedexCaixa')


botao.addEventListener('click', function(event){
    event.preventDefault();
  
    const nomePkmValue = nomePkm.value
    const url = `https://pokeapi.co/api/v2/pokemon/${nomePkmValue}`
    console.log (nomePkmValue)
   
   
      fetch(url)
     .then(function(response){
       if(response.status !== 200){
         limparCard(); 
         return mensagemErro.textContent = `Não foi possivel capturar esse pokemom, tente novamente!`
        
       
       }
      

      mensagemErro.textContent = '';
      return response.json();

})
    
     
      .then(function(dados){
      console.log(dados);
      img.src = dados.image_url;
      h2.textContent = dados.name;
      p.textContent =  dados.quote;
    })

      const limparCard = () => {
      img.src = ` https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      h2.textContent = `${id} .${nome}`;
      p.textContent = '';
    }
    


})
