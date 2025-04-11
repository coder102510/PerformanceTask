let SCORE = 0;
let LEVEL = 0;

const scoreContainer = document.getElementById("scoreContainer");


const MERCURY = "https://images.deepai.org/art-image/d7f42393e07945b5aa57fd7ee4605cb8/cool-comic-version-of-the-planet-mercury-6fdaf6.jpg";
const VENUS = "https://images.deepai.org/art-image/d54e91661c9b47c99b712d537ee62141/cool-comic-version-of-the-planet-venus-1ae6e4.jpg";
const EARTH = "https://images.deepai.org/art-image/2725c60875e444549bf7fe1c46431d8f/2d-image-of-earth.jpg";
const MARS = "https://images.deepai.org/art-image/6d0471a1cceb4f25a389a7025f136a7b/2d-cartoony-image-of-pluto-planet.jpg";
const JUPITER = "https://images.deepai.org/art-image/04005b48c27c439cbe514c9a89d94d55/2d-cartoony-image-of-jupiter-c3aa47.jpg";
const SATURN = "https://images.deepai.org/art-image/57dad362e2024926a3e87860858f73db/2d-cartoony-image-of-saturn.jpg";
const URANUS = "https://images.deepai.org/art-image/f982c0975dee43508681fdebbacd58e0/2d-cartoony-image-of-uranus.jpg";
const NEPTUNE = "https://images.deepai.org/art-image/303f9cec138242439abe49788129b692/2d-cartoony-image-of-neptune-planet.jpg";
const PLUTO = "https://images.deepai.org/art-image/6d0471a1cceb4f25a389a7025f136a7b/2d-cartoony-image-of-pluto-planet.jpg";


let IMG = document.createElement("img");

function initPlanet(score) {
    if (score < 20) {
        LEVEL = 0;
        IMG.src = MERCURY;
    } else if (score >= 20 && score < 50) {
        LEVEL = 1;
        IMG.src = VENUS;
    } else if (score >= 50) {
        LEVEL = 2;
        IMG.src = EARTH;
    } else if (score >= 150 && score < 300) {
        LEVEL = 3;
        IMG.src = MARS;
    } else if (score >= 300 && score < 500) {
        LEVEL = 3
    }
    document.body.appendChild(IMG);
}

initPlanet(SCORE);

IMG.onclick = function() {
    SCORE++;
    initPlanet(SCORE);
    scoreContainer.innerHTML = SCORE;
    console.log(SCORE);
}









