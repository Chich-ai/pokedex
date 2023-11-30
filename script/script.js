var quantidade = document.getElementById('quantidade');

quantidade.addEventListener('keyup', ()=>{
    pegaPokemon(quantidade.value)
})

function pegaPokemon(quantidade){
    fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=' + quantidade
    ).then(response => response.json()
    ).then(allpokemon => {
        var pokemon = [];
        allpokemon.results.map((val) =>{
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle =>{
                pokemon.push({
                    nome : val.name,
                    imagem : pokemonSingle.sprites.front_default
                });

                if(pokemon.length == quantidade){
                    var pokemonBoxes = document.querySelector('.pokemon-boxes');
                    pokemonBoxes.innerHTML = "";

                    pokemon.map(function(val){
                        pokemonBoxes.innerHTML += `
                        <div class="pokemon-box">
                        <img src="` + val.imagem + `"/>
                        <p>` + val.nome + `<p>
                        </div>
                        `;
                    })
                }
            })
        })
    })
}