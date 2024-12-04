
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




// ajouter un plyer


function addPlayer() {
  const position = document.getElementById('position').value;
  const Name = document.getElementById('Name').value;
  const nationality = document.getElementById('nationality').value;
  const photo = document.getElementById('photo').files[0];
  const flag = document.getElementById('flag').value;
  const club = document.getElementById('club').value;
  const logo = document.getElementById('logo').value;
  const rating = document.getElementById('rating').value;
  const pace = document.getElementById('pace').value;
  const shooting = document.getElementById('shooting').value;
  const passing = document.getElementById('passing').value;
  const dribbling = document.getElementById('dribbling').value;
  const defending = document.getElementById('defending').value;
  const physical = document.getElementById('physical').value;

  if (!position || !Name || !nationality || !photo || !flag || !rating || !logo || !club || !pace || !shooting || !passing || !dribbling || !defending || !physical) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  let imageSrc = "";
  if (photo) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageSrc = e.target.result;
      
     
      addCard(
        position, physical, defending, dribbling, passing, shooting, 
        club, pace, logo, flag, nationality, Name, imageSrc, rating, photo
      );
     
      closeModal();
    };
    reader.readAsDataURL(photo);
  } else {

    addCard(
      position, physical, defending, dribbling, passing, shooting, 
      club, pace, logo, flag, nationality, Name, imageSrc, rating, photo
    );
    closeModal();
  }
}

function addCard(position, physical, defending, dribbling, passing, shooting, 
                 club, pace, logo, flag, nationality, Name, imageSrc, rating, photo) {
  const container = document.getElementById('joueurs');
  const card = document.createElement('div');
  card.classList.add('card_players');
  card.setAttribute('draggable', 'true');

  // Corrected template string with correct variable usage
  card.innerHTML = `
    <div class="player_card" draggable="true">
      <div class="imgbkrnd">
        <div class="player-rating">${rating}</div>
        <div class="player-position">${position}</div>
        <img src="${flag}" alt="Drapeau" class="player-flag">
        <img src="${logo}" alt="Logo Club" class="club-logo">
        <img src="${imageSrc}" alt="Joueur" class="player-image">
        <h2 class="player-name">${Name}</h2>
        <div class="player-stats">
          ${position !== "GK" 
            ? `
              <p>${pace}<span>PAC</span></p>
              <p>${shooting}<span>SHO</span></p>
              <p>${passing}<span>PAS</span></p>
              <p>${dribbling}<span>DRI</span></p>
              <p>${defending}<span>DEF</span></p>
              <p>${physical}<span>PHY</span></p>
            `
            : `
              <p>Goalkeeper stats not implemented</p>
            `
          }
        </div>
      </div>
    </div>`;

  container.appendChild(card);
  
  // Only call dragItem if the function exists
  if (typeof dragItem === 'function') {
    dragItem();
  }
}

function closeModal() {
  var modalElement = document.getElementById('exampleModal');
  var modal = bootstrap.Modal.getInstance(modalElement);
  
  if (modal) {
    modal.hide();
  } else {

    modal = new bootstrap.Modal(modalElement);
    modal.hide();
  }
}

