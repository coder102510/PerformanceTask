let SCORE = 0;
let LEVEL = 0;


const MERCURY = "https://images.deepai.org/art-image/d7f42393e07945b5aa57fd7ee4605cb8/cool-comic-version-of-the-planet-mercury-6fdaf6.jpg";
const VENUS = "https://images.deepai.org/art-image/d54e91661c9b47c99b712d537ee62141/cool-comic-version-of-the-planet-venus-1ae6e4.jpg";
const EARTH = "https://images.deepai.org/art-image/2725c60875e444549bf7fe1c46431d8f/2d-image-of-earth.jpg";
const MARS = "https://images.deepai.org/art-image/6d0471a1cceb4f25a389a7025f136a7b/2d-cartoony-image-of-pluto-planet.jpg";
const JUPITER = "https://images.deepai.org/art-image/04005b48c27c439cbe514c9a89d94d55/2d-cartoony-image-of-jupiter-c3aa47.jpg";
const SATURN = "https://images.deepai.org/art-image/57dad362e2024926a3e87860858f73db/2d-cartoony-image-of-saturn.jpg";
const URANUS = "https://images.deepai.org/art-image/f982c0975dee43508681fdebbacd58e0/2d-cartoony-image-of-uranus.jpg";
const NEPTUNE = "https://images.deepai.org/art-image/303f9cec138242439abe49788129b692/2d-cartoony-image-of-neptune-planet.jpg";
const PLUTO = "https://images.deepai.org/art-image/6d0471a1cceb4f25a389a7025f136a7b/2d-cartoony-image-of-pluto-planet.jpg";

// Game State
let clicks = 0;
let clickValue = 1;
let rebirths = 0;
const upgrades = [
    { 
        name: "Rocket Boosters", 
        cost: 50, 
        multiplier: 2,
        description: "Double your clicking power!",
        icon: "🚀"
    },
    { 
        name: "Gravity Assist", 
        cost: 100, 
        multiplier: 3,
        description: "Triple your clicking power!",
        icon: "🌌"
    },
    { 
        name: "Planetary Drive", 
        cost: 200, 
        multiplier: 5,
        description: "Quintuple your clicking power!",
        icon: "🪐"
    }
];

// Main Container
const gameContainer = document.createElement('div');
gameContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0f0c29, #302b63);
    color: white;
    font-family: 'Arial', sans-serif;
`;

// Centered Planet
const mercuryImage = document.createElement('img');
mercuryImage.src = 'https://images.deepai.org/art-image/d7f42393e07945b5aa57fd7ee4605cb8/cool-comic-version-of-the-planet-mercury-6fdaf6.jpg';
mercuryImage.style.cssText = `
    width: 300px;
    margin: 40px 0;
    cursor: pointer;
    transition: transform 0.3s;
    filter: drop-shadow(0 0 20px rgba(255,165,0,0.7));
`;

// Click Display
const clickDisplay = document.createElement('div');
clickDisplay.style.cssText = `
    font-size: 2rem;
    margin: 20px;
    text-align: center;
`;

// Upgrades Container
const upgradesContainer = document.createElement('div');
upgradesContainer.style.cssText = `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    position: fixed;
    bottom: 20px;
    padding: 20px;
    background: rgba(0,0,0,0.8);
    border-radius: 15px;
`;

// Upgrade Description Dropdown
const helpDropdown = document.createElement('select');
helpDropdown.style.cssText = `
    position: fixed;
    bottom: 160px;
    padding: 10px;
    background: #1a1a1a;
    color: white;
    border: 2px solid #4CAF50;
    border-radius: 8px;
`;
helpDropdown.innerHTML = `
    <option>Hover for upgrade info</option>
    ${upgrades.map(u => `
        <option title="${u.description}">${u.name}: ${u.description}</option>
    `).join('')}
`;

// Rebirth System
const rebirthButton = document.createElement('button');
rebirthButton.style.cssText = `
    position: fixed;
    bottom: 120px;
    padding: 15px 30px;
    background: #ff5722;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: none;
    font-size: 1.1rem;
`;

// Create Upgrade Buttons
upgrades.forEach(upgrade => {
    const btn = document.createElement('button');
    btn.style.cssText = `
        padding: 15px;
        background: #2c3e50;
        color: white;
        border: 2px solid #3498db;
        border-radius: 8px;
        cursor: pointer;
        min-width: 200px;
        transition: all 0.3s;
    `;
    
    btn.innerHTML = `
        <div style="font-size: 1.5rem">${upgrade.icon}</div>
        <div>${upgrade.name}</div>
        <div style="color: #95a5a6">Cost: ${upgrade.cost}</div>
    `;

    btn.onclick = () => {
        if(clicks >= upgrade.cost) {
            clicks -= upgrade.cost;
            clickValue *= upgrade.multiplier;
            upgrade.cost *= 2;
            updateGame();
            btn.style.background = '#34495e';
            setTimeout(() => btn.style.background = '#2c3e50', 200);
        }
    };

    upgradesContainer.appendChild(btn);
});

// Click Handler
mercuryImage.addEventListener('click', () => {
    clicks += clickValue;
    mercuryImage.style.transform = `
        translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)
        rotate(${Math.random() * 4 - 2}deg)
    `;
    setTimeout(() => mercuryImage.style.transform = '', 100);
    updateGame();
});

// Rebirth Handler
rebirthButton.onclick = () => {
    if(clicks >= 1000) {
        clicks = 0;
        rebirths++;
        clickValue = 1 + rebirths;
        upgrades.forEach(u => u.cost = 50);
        updateGame();
    }
};

// Update Game State
function updateGame() {
    clickDisplay.innerHTML = `
        Clicks: ${clicks}<br>
        Value: ${clickValue}/click<br>
        ${rebirths ? `Rebirths: ${rebirths} (${rebirths}x)` : ''}
    `;
    
    rebirthButton.style.display = clicks >= 1000 ? 'block' : 'none';
    rebirthButton.textContent = `Rebirth (Cost: 1,000) - Bonus: ${rebirths + 1}x`;
    
    upgradesContainer.childNodes.forEach((btn, i) => {
        btn.disabled = clicks < upgrades[i].cost;
        btn.style.opacity = clicks < upgrades[i].cost ? '0.6' : '1';
        btn.querySelector('div:last-child').textContent = `Cost: ${upgrades[i].cost}`;
    });
}

// Assemble Game
gameContainer.appendChild(clickDisplay);
gameContainer.appendChild(mercuryImage);
gameContainer.appendChild(helpDropdown);
gameContainer.appendChild(rebirthButton);
gameContainer.appendChild(upgradesContainer);
document.body.appendChild(gameContainer);

// Initial Setup
updateGame();
document.body.style.margin = '0';

