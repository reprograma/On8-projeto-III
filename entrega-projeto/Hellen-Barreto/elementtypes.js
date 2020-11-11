const getDados = () => {
    const requestUrl = `https://pokeapi.co/api/v2/pokemon/`
    
    fetch(requestUrl)
    .then((response) => response.json())
    .then((json) => {
      const types = json.types;
      const arrTypes = types.map(typeInfo => typeInfo.type.name)
      const colocandoPiper = arrTypes.join(' | ')
      console.log(colocandoPiper)
      console.log(arrTypes[0])

    } )
}