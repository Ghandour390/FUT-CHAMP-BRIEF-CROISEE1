
async function Fetch() {
  try {
      const response = await fetch('http://127.0.0.1:5500/players.json');
      if (!response.ok) throw new Error('Failed to fetch players data');
      const players = await response.json();
      return players;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

let arryPlayers = [];

const lesJoueurs = document.getElementById("joueurs")

Fetch().then(playersData => {
  if (playersData) {
      arryPlayers.push(...playersData.players);
      // console.log('Players Array:', arryPlayers);
      display(arryPlayers); 

  }
}).catch(error => {
  console.error('Error fetching data:', error);
});

function display(arryPlayers) {
  const lesJoueurs = document.querySelector("#joueurs");

  if (!lesJoueurs) return;

  let joueursHTML = arryPlayers.map(joueurs => {
    return `
      <div class="player_card" draggable="true">
          <div class="imgbkrnd">
              <div class="player-rating">${joueurs.rating}</div>
              <div class="player-position">${joueurs.position}</div>
              <img src="${joueurs.flag}" alt="Drapeau" class="player-flag">
              <img src="${joueurs.logo}" alt="Logo Club" class="club-logo">
              <img src="${joueurs.photo}" alt="Joueur" class="player-image">
              <h2 class="player-name">${joueurs.name}</h2>
              <div class="player-stats">
                  ${
                    joueurs.position !== "GK"
                      ? `
                      <p>${joueurs.pace}<span>PAC</span></p>
                      <p>${joueurs.shooting}<span>SHO</span></p>
                      <p>${joueurs.passing}<span>PAS</span></p>
                      <p>${joueurs.dribbling}<span>DRI</span></p>
                      <p>${joueurs.defending}<span>DEF</span></p>
                      <p>${joueurs.physical}<span>PHY</span></p>
                      `
                      : `
                      <p>${joueurs.diving}<span>DIV</span></p>
                      <p>${joueurs.positioning}<span>POS</span></p>
                      <p>${joueurs.handling}<span>HAN</span></p>
                      <p>${joueurs.speed}<span>SPD</span></p>
                      <p>${joueurs.kicking}<span>KIC</span></p>
                      <p>${joueurs.reflexes}<span>REF</span></p>
                      `
                  }
              </div>
          </div>
      </div>`;
  }).join('');

  lesJoueurs.innerHTML = joueursHTML;

  /* <_________________dragan drop__________________________> */
  const listejoueurs = document.getElementsByClassName('player_card');
  let cardjoueurs = Array.from(listejoueurs);
  const playersBox = document.querySelectorAll('.position');
  let draggedElement = null;

  cardjoueurs.forEach((el) => {
    el.addEventListener("dragstart", (e) => {
      draggedElement = e.currentTarget;
      e.dataTransfer.effectAllowed = "move";
    });

    el.addEventListener("dragend", () => {
      draggedElement = null;
    });
  });

  playersBox.forEach((ele) => {
    ele.addEventListener("dragover", (e) => {
      console.log(draggedElement && draggedElement.querySelector('.player-position').textContent, ele.textContent.trim())
      if (draggedElement && draggedElement.querySelector('.player-position').textContent.trim() === ele.textContent.trim()) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }
    });

    ele.addEventListener("drop", (e) => {
        ele.innerHTML = "";
        ele.appendChild(draggedElement);
      
    });
  });
}



  // const RWposition = filterByposition(arryPlayers,"LW");
  // console.log(RWposition);


// Fetch();

// const GK = filterByposition(arryPlayers,"GK");
// console.log(GK)





