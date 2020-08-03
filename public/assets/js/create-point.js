// Popula os selects de Estado e Cidade
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]');

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then( states => {
        for (let state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector('[name=city]');
    const ufInput = document.querySelector('[name=ufInput]');
    const cityInput = document.querySelector('[name=cityInput]');

    let ufValue = event.target.value;

    let indexOfSelectedState = event.target.selectedIndex;
    ufInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for (let city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false;    
        
        citySelect.addEventListener('change', ()=> {
            let indexOfSelecteCity = this.selectedIndex;
            cityInput.value = citySelect.options[indexOfSelecteCity].text;
        })

    })
}

document.querySelector('select[name=uf]').addEventListener("change", getCities);

// Itens de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li');
const collectedItems = document.querySelector('[name=items]');
let selectedItems = [];

for (let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(event){
    let item = event.target;
    let itemId = event.target.dataset.id;

    item.classList.toggle('selected');

    // verificar se existe item selecionado, se sim, pegar o item selecionado
    let alreadySelected = selectedItems.findIndex( item => {
        return item == itemId // retorna true ou false
    });

    // se já tiver selecionado
    if(alreadySelected >= 0){
        // tira a selecao
        let filteredItems = selectedItems.filter( item => {
            let itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems;

    } else{
        // se não tiver selecionado, adiciona a selação
        selectedItems.push(itemId);
    } 

    // atualizar o input hidden
    collectedItems.value = selectedItems;
}
