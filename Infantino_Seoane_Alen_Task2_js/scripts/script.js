const miembros = data.results[0].members;
const dataTable = document.getElementById("cuerpoTabla")

function hacerTabla(array, id) {
    id.innerHTML= ""
    array.forEach(senators => {
        let fila = document.createElement("tr")
        let middle = ""
        if (senators.middle_name == null){
            middle = ""
        }
        else{
            middle = senators.middle_name
        }
       
        fila.innerHTML = `<td><a href = "${senators.rss_url}"> ${senators.last_name} <a/></td> <td> ${middle} </td><td> ${senators.first_name} <td> ${senators.party} </td> <td> ${senators.state} </td> <td> ${senators.seniority} </td> <td> ${senators.votes_with_party_pct} % </td>`
        id.appendChild(fila)  
       });
}

hacerTabla(miembros,dataTable)



// //fitros//



const checkboxButtons = document.querySelectorAll("input[type='checkbox']");
checkboxButtons.forEach(checkbox => checkbox.addEventListener("change", () => {
    hacerTabla(partyFilter(stateFilter(miembros)), dataTable);
}));

function partyFilter(array) {
    const seleccionados = Array.from(checkboxButtons).filter(checkbox => checkbox.checked).map(selected => selected.id);
    if (seleccionados.length == 0) {
        return array;
    }
    else {
        let filtrados = array.filter(member => seleccionados.includes(member.party));
        return filtrados;
    };
};

function states() {
    let states = [];
    miembros.forEach(member => {
        if (states.indexOf(member.state) == -1) {
            states.push(member.state);
        };
    });
    return states.sort();
};

const dropdown = document.getElementById("dropdown");
function generateOptions() {
    let estados = states();
    estados.forEach(estado => {
        let opcion = document.createElement("option");
        opcion.setAttribute("value", estado);
        opcion.setAttribute("class", "opcion");
        opcion.innerHTML = `${estado}`;
        dropdown.appendChild(opcion);
    });
};

generateOptions();

dropdown.addEventListener("change", () => {
    hacerTabla(stateFilter(partyFilter(miembros)), dataTable);
});

function stateFilter(array) {
    let option;
    document.querySelectorAll("option").forEach(opcion => {
        if (opcion.selected){
            option = opcion.value;
        };
    });
    let filtrados = [];
    if (option == "Select State") {
        return array;
    }
    else {
        filtrados = array.filter(member => {
            return option == member.state;
        });
        return filtrados;
    };
};













