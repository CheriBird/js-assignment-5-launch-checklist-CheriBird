// Write your JavaScript code here!

window.addEventListener("load", function() {
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
//    debugger;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet 
       // fom the list of planets and add that information to your destination.
       let chosen = pickPlanet(listedPlanets); // pick planet
       console.log(chosen);
       // display planet info
       addDestinationInfo(document, chosen.name, chosen.diameter, chosen.star, chosen.distance, chosen.moons, chosen.image);
    
   })
   
    let form = document.getElementById("launchForm");
    form.addEventListener("submit", function(event) {
        let list = document.getElementById("faultyItems").value;
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;
        console.log(`pilot: ${pilot}; copilot: ${copilot}`);
        console.log(`fuel: ${fuelLevel}; cargo: ${cargoLevel}`);
        // let ready = 
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
        // debugger;
        // if (!ready) {
            event.preventDefault(); // stop form submission
        // }
    });
});
