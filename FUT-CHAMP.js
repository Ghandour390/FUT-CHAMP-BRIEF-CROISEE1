
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
  
  if (!lesJoueurs) {
      return;
  }
// console.log("ana khdam")
  const joueursHTML = arryPlayers.map(joueurs => {
      if (joueurs.position !== "GK") {
          return `
          <div class="player_card">
              <div class="imgbkrnd">
                  <div class="player-rating">${joueurs.rating}</div>
                  <div class="player-position">${joueurs.position}</div>
                  <img src="${joueurs.flag}" alt="Drapeau" class="player-flag">
                  <img src="${joueurs.logo}" alt="Logo Club" class="club-logo">
                  <img src="${joueurs.photo}" alt="Joueur" class="player-image">
                  <h2 class="player-name">${joueurs.name}</h2>
                  <div class="player-stats">
                      <p>${joueurs.pace}<span>PAC</span></p>
                      <p>${joueurs.shooting}<span>SHO</span></p>
                      <p>${joueurs.passing}<span>PAS</span></p>
                      <p>${joueurs.dribbling}<span>DRI</span></p>
                      <p>${joueurs.defending}<span>DEF</span></p>
                      <p>${joueurs.physical}<span>PHY</span></p>
                  </div>
              </div>
          </div>`;
      } else {
          return `
          <div class="player_card">
              <div class="imgbkrnd">
                  <div class="player-rating">${joueurs.rating}</div>
                  <div class="player-position">${joueurs.position}</div>
                  <img src="${joueurs.flag}" alt="Drapeau" class="player-flag">
                  <img src="${joueurs.logo}" alt="Logo Club" class="club-logo">
                  <img src="${joueurs.photo}" alt="Joueur" class="player-image">
                  <h2 class="player-name">${joueurs.name}</h2>
                  <div class="player-stats">
                      <p>${joueurs.diving}<span>DIV</span></p>
                      <p>${joueurs.positioning}<span>POS</span></p>
                      <p>${joueurs.handling}<span>HAN</span></p>
                      <p>${joueurs.speed}<span>SPD</span></p>
                      <p>${joueurs.kicking}<span>KIC</span></p>
                      <p>${joueurs.reflexes}<span>REF</span></p>
                  </div>
              </div>
          </div>`;
      }
  }).join('');
  
  function filterByposition(arryPlayers,position){
  return arryPlayers.filter(players =>players.position == position);
  
}
lesJoueurs.innerHTML = joueursHTML;

  const RWposition = filterByposition(arryPlayers,"LW");
  console.log(RWposition);
}
lesJoueurs.innerHTML = joueursHTML; 

Fetch();

const GK = filterByposition(arryPlayers,"GK");
console.log(GK)
/* <_________________dragan drop__________________________> */


let DragE = null;

document.querySelectorAll(".player_card").forEach(player_card => {
  player_card.addEventListener('dragstart', (e) => {
    DragE = e.currentTarget;
    DragE.classList.add('is-dragging');
  });

  player_card.addEventListener('dragend', () => {
    if (DragE) {
      DragE.classList.remove('is-dragging');
      DragE = null; 
    }
  });
});


const dropZones = document.querySelectorAll(".drapzon");


dropZones.forEach(boxP => {
  boxP.addEventListener('dragover', (e) => {
    e.preventDefault();  
  });

  
  boxP.addEventListener('drop', (e) => {
    e.preventDefault();
    if (DragE) {
      boxP.appendChild(DragE); 
      DragE.classList.remove('is-dragging'); 
      DragE = null; 
    }
  });
});


