const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2605-ftb-et-web"

//stat
let parties = [];
let selectedParty = null;

//const eventList = document.querySelector("#eventList");

//Get events from API
async function fetchParties() {
    try{
        const response = await fetch(API + "/events");
        console.log(response);
        const results = await response.json();
        parties = results.data;
        console.log(parties);
       
    
    } catch(error){
        console.log(error);
    }
} 

async function getParty(id) {
    try {
        const response = await fetch(API + "/events/" + id)
        const results = await response.json();
        selectedParty = results.data;
        render();

    } catch (error) {
        console.log(error);
    }
}

//Components
function partyListItem(party){
    const $li = document.createElement("li");
    
    if(party.id === selectedParty?.id){
        $li.classList.add("selected");
    }

    $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;

    $li.addEventListener("click", () => getParty(party.id));
    return $li;
}

function PartyList(){
    const $ul = document.createElement("ul");
    $ul.classList.add("parties");
    
    const $parties = parties.map(partyListItem);
    $ul.replaceChildren(...$parties);
    return $ul;
}

function SelectedParty(){
    if (!selectedParty){
        const $p = document.createElement("p");
        $p.textContent = "Select an Event to hear more";
        return $p;
    }

    const $party = document.createElement("section");
    $party.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <time datetime"${selectedParty.date}">
        ${selectedParty.date.slice(0, 10)}
    </time>
    <address>${selectedParty.location}</address>
    <p>${selectedParty.description}</p>`

    return $party;
}

function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
    <h1> Super Cool Event Planner</h1>
    <main>
    <section>
        <h2> Upcoming Events</h2>
        <div id="partyList"></div>
    </section>
    <section id="selected">
        <h2>Event Details</h2>
        <selectedParty></selectedParty>
        </section>
        </main>`;

    $app.querySelector("#partyList").replaceWith(PartyList());
    $app.querySelector("selectedParty").replaceWith(SelectedParty());

    
}


async function init() {
  await fetchParties();
  
  render();
}

init();
