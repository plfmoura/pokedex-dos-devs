const poke_container = document.querySelector('.poke-container');
const modal_content = document.querySelector('.modal-content');
const modal_overlay = document.querySelector('.modal-overlay');
const modal_container = document.querySelector('.modal-container');

const checkPokeTypes = (type) => {
    let output_type;
    if (!type) {
        return
    } else {
        switch (type) {
            case 'grass':
                output_type = "#61d44d"
                break;
            case 'fire':
                output_type = "orange"
                break;
            case 'bug':
                output_type = "purple"
                break;
            case 'water':
                output_type = "#4bc6ee"
                break;
            case 'normal':
                output_type = "#c1c1c1"
                break;
            case 'poison':
                output_type = "#ec59ec"
                break;
            case 'electric':
                output_type = "#e3d61f"
                break;
            case 'ground':
                output_type = "#f8bf3b"
                break;
            default:
                output_type = "transparent"
                break;
        }
    }
    return output_type
}

const ModalController = (action) => {
    if (action === 'show') {
        modal_container.style.display = 'flex'
    } else {
        modal_container.style.display = 'none';
    }
}

modal_overlay.addEventListener('click', () => ModalController());

const handleSelected = (e) => {
    let selected_poke = e.target.id;
    let poke_URL = `https://pokeapi.co/api/v2/pokemon/${selected_poke}`

    fetch(poke_URL, options)
        .then(response => response.json())
        .then(response => {
            modal_content.innerHTML = `
            <h2 class="selected-poke-name">${response.name}</h2>
            <img src=${response.sprites.front_default} alt=${response.name} class="selected-poke-img">
            <div class="selected-align-types">
                <span class="selected-poke-types">${response.types[0].type.name}</span>
                <span class="selected-poke-types">${response.types[1] ? response.types[1].type.name : ""}</span>
            </div>
            `;

            ModalController('show');
        }
        )
        .catch(err =>
            console.error(err)
        );
}

const createPokeCard = (
    { name: name,
        id: id,
        sprite: sprite,
        type: type }
) => {
    let poke_card = document.createElement('div');
    poke_card.classList.add('poke-card-container');
    poke_card.setAttribute('id', id);
    poke_card.style.backgroundColor = checkPokeTypes(type);
    poke_card.innerHTML = `
        <img src=${sprite} alt="" class="poke-sprite">
        <p class="poke-name">${name}</p>
        <span 
        class="poke-type" 
        style="background-color: ${checkPokeTypes(type)}"
        >
        ${type}
        </span>
    `
    poke_container.appendChild(poke_card);
    poke_card.addEventListener('click', (e) => handleSelected(e))
}

const options = { method: 'GET' };
const pokemons = []

for (let index = 1; index <= 30; index++) {
    let poke_URL = `https://pokeapi.co/api/v2/pokemon/${index}`

    fetch(poke_URL, options)
        .then(response => response.json())
        .then(response => createPokeCard(
            {
                name: response.name,
                id: response.id,
                sprite: response.sprites.front_default,
                type: response.types[0].type.name
            }))
        .catch(err =>
            console.error(err)
        );
}
