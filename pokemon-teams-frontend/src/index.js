const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

main();

function main() {
  loadTrainers()
}

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(trainersJson => displayTrainerCard(trainersJson))
}

function displayTrainerCard(trainersJson) {
  for (const trainer of trainersJson) {
    const mainContainer = document.querySelector('main')
    const trainerCard = document.createElement('div')
    const trainerName = document.createElement('p')
    const addPokemonBtn = document.createElement('button')
    addPokemonBtn.id = 'add-button'
    const pokemonList = document.createElement('ul')

    trainerCard.classList.add('card')
    trainerName.innerText = trainer.name
    addPokemonBtn.innerText = "Add Pokemon"
        addPokemonBtn.addEventListener('click', () => {
          fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              trainer_id: trainer.id
            })
          })
          .then(res => {
            if (res.status === 204) {
              return
            }
            return res.json().then(pokemonJson => {
              trainer.pokemons.push(pokemonJson)
              addPokemonToList(trainer, pokemonJson, pokemonList)
            })
          })
          .catch(console.log)
        })

    mainContainer.appendChild(trainerCard)
    trainerCard.append(trainerName, addPokemonBtn, pokemonList)

    for (pokemon of trainer.pokemons) {
      addPokemonToList(trainer, pokemon, pokemonList)
    }
  }
}

function addPokemonToList(trainer, pokemon, pokemonList) {
  const releasePokemonBtn = document.createElement('button')
  const pokemonName = document.createElement('li')

  releasePokemonBtn.classList.add('release')
  releasePokemonBtn.innerText = 'Release'
  releasePokemonBtn.addEventListener('click', () => {
    fetch(POKEMONS_URL + `/${pokemon.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(pokemonName.remove())
  })

  pokemonName.innerText = `${pokemon.nickname} (${pokemon.species})`

  pokemonList.appendChild(pokemonName)
  pokemonName.appendChild(releasePokemonBtn)
}
