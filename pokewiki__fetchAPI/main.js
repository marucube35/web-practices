const pokemonApi = "http://localhost:3000/pokemons";

function start() {
  getPokemons();
  handleCreate();
  handleUpdate();
}
// Using API with GET
function getPokemons() {
  fetch(pokemonApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      renderPokemons(json);
    });
}

function renderPokemons(json) {
  var pokemonListBlock = document.querySelector("#pokemons-list");
  var htmls = json.map(function (pokemon) {
    return `
        <li id = "pokedex-${pokemon.id}">
          <h4>${pokemon.id}</h4>
          <h4>${pokemon.name}</h4>
          <h4>${pokemon.type}</h4>
          <button onclick = "deletePokemon(${pokemon.id})">Delete</button>
        </li>
        `;
  });
  pokemonListBlock.innerHTML = htmls.join("");
}

function renderNewPokemon(json) {
  var pokeItemList = document.querySelector("#pokemons-list");

  // Create element with attribute
  var pokeItem = document.createElement("li");
  var pokeAttribute = document.createAttribute("id");
  pokeAttribute.value = `pokedex-${json.id}`;
  pokeItem.setAttributeNode(pokeAttribute);

  // Add information
  pokeItem.innerHTML = `<h4>${json.id}</h4>
      <h4>${json.name}</h4>
      <h4>${json.type}</h4>
      <button onclick = "deletePokemon(${json.id})">Delete</button>`;

  // Append to the list
  pokeItemList.appendChild(pokeItem);
}

// Using API with POST
function createPokemon(newPoke, callback) {
  var options = {
    method: "POST",
    body: JSON.stringify(newPoke),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(options);
  // Receive new object after creating.
  fetch(pokemonApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
    .catch(function (error) {
      console.error(error);
    });
}

function handleCreate() {
  var createButtonBlock = document.querySelector("#create");
  createButtonBlock.onclick = function () {
    var nameInputBlock = document.querySelector('input[name = "name"]').value;
    var typeInputBlock = document.querySelector('input[name = "type"]').value;
    if (nameInputBlock === "" || typeInputBlock === "") {
      alert("Empty input!");
    } else {
      var newPoke = {
        name: nameInputBlock,
        type: typeInputBlock,
      };
      // Add pokemon to DB and HTML
      createPokemon(newPoke, renderNewPokemon);
    }
  };
}

function updatePokemon(updatePoke, callback) {
  var options = {
    method: "PUT",
    body: JSON.stringify(updatePoke),
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(options);
  fetch(pokemonApi + "/" + updatePoke.id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback)
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

function handleUpdate() {
  var createButtonBlock = document.querySelector("#update");
  createButtonBlock.onclick = function () {
    var nameInputBlock = document.querySelector('input[name = "name"]').value;
    var typeInputBlock = document.querySelector('input[name = "type"]').value;
    var idInputBlock = document.querySelector('input[name = "id"]').value;

    if (nameInputBlock === "" || typeInputBlock === "" || idInputBlock === "") {
      alert("Empty update input!");
    } else {
      var updatePoke = {
        name: nameInputBlock,
        type: typeInputBlock,
        id: idInputBlock,
      };

      // Remove old pokemon from HTML
      var pokeItem = document.querySelector(`#pokedex-${idInputBlock}`);
      if (pokeItem) {
        pokeItem.remove();
      }
      // Add new pokemon to DB and HTML
      updatePokemon(updatePoke, renderNewPokemon);
    }
  };
}

function deletePokemon(pokeId) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(options);
  fetch(pokemonApi + "/" + pokeId, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var pokeItem = document.querySelector(`#pokedex-${pokeId}`);
      console.log(pokeItem);
      if (pokeItem) {
        pokeItem.remove();
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

start();
