// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    const container = document.getElementById('missionTarget');
    container.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}" />
    `;
}

function validateInput(testInput) {
    // check for special characters too?
    // console.log("validating... " + testInput);
    if (testInput.length === 0) {
        return "Empty";
    } else if (isNaN(testInput) === true) {
        return "Not a Number";
    } else if (parseInt(testInput) !== 'NaN') {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let launchReady = false;
    let validatePilot = validateInput(pilot);

    // would be good to have an additional validation to check all fields at once
    // and if any are empty, alert that "All fields are required."

    // console.log("validate pilot msg: " + validatePilot);
    if (validatePilot === "Empty") {
        document.getElementById("pilotStatus").innerHTML = `Pilot Ready`;
        alert("Pilot Name is required.");   // trigger an alert
    } else if (validatePilot === "Is a Number") {
        document.getElementById("pilotStatus").innerHTML = `Pilot Ready`;
        alert("Pilot Name must be a string.");   // trigger an alert
    } else {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    }

    let validateCopilot = validateInput(copilot);
    // console.log("validate copilot msg: " + validateCopilot);
    if (validateCopilot === "Empty") {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot Ready`;
        alert("Co-pilot Name is required.");   // trigger an alert
    } else if (validateCopilot === "Is a Number") {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot Ready`;
        alert("Co-pilot Name must be a string.");   // trigger an alert
    } else {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    let validateFuel = validateInput(fuelLevel);
    // console.log("validate fuelLevel msg: " + validateFuel);
    if (validateFuel === "Empty") {
        alert("Fuel Level is required.");   // trigger an alert
    } else if (validateFuel === "Not a Number") {
        alert("Fuel Level must be a Number.");   // trigger an alert
    } else if (validateFuel === "Is a Number" && fuelLevel < 10000) {
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
    } else if (validateFuel === "Is a Number" && fuelLevel >= 10000) {
        document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
    }

    let validateCargo = validateInput(cargoLevel);
    // console.log("validate cargoLevel msg: " + validateCargo);
    if (validateCargo === "Empty") {
        alert("Cargo Mass is required.");   // trigger an alert
    } else if (validateCargo === "Not a Number") {
        alert("Cargo Mass must be a Number.");    // trigger an alert
    } else if (validateCargo === "Is a Number" && cargoLevel > 10000) {
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        document.getElementById("launchStatus").style.color = "#C7254E";
        document.getElementById("faultyItems").style.visibility = "visible";
    } else if (validateCargo === "Is a Number" && cargoLevel <= 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    }

    // if all 4 inputs are valid, chg color and designate readiness
    if (validatePilot === "Not a Number" && validateCopilot === "Not a Number" && 
        validateFuel === "Is a Number" && fuelLevel >= 10000 && 
        validateCargo === "Is a Number" && cargoLevel <= 10000) {
        document.getElementById("launchStatus").style.color = "#419F6A";
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
        document.getElementById("faultyItems").style.visibility = "visible";
        launchReady = true;
    }

    return launchReady;
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then( function(response) {
        return response.json();
    });
    // .then((data) => console.log(data))
    // .catch((error) => console.log(error));

    return planetsReturned;
}

function pickPlanet(planets) {
    let min = Math.ceil(0);
    let max = Math.floor(planets.length - 1);
    let chosen = Math.floor(Math.random() * (max - min) + min);
    return planets[chosen];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
