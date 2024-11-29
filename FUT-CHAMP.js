
async function Fetch() {
    const response = await fetch('http://127.0.0.1:5500/players.json');
    const players= await response.json();
    console.log(players);
    disply(players.players);
    console.log("ana hna");
    filterPositon(players);
    return players;
    
}


function disply(data){

    const lesJoueurs = document.getElementById("joueurs");

    lesJoueurs.innerHTML= data.map((joueurs =>{
if(joueurs.position !== "GK"){
  console.log(joueurs.position);
  
        return`
        
      
        <div class="player_card" >
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
              <p>${joueurs.passing} <span>PAS</span></p>
              <p>${joueurs.dribbling}<span>DRI</span></p>
              <p>${joueurs.defending}<span>DEF</span></p>
              <p>${joueurs.physical}<span>PHY</span></p>
            </div>
          </div>
       </div>
            
        `}
else{
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
              <p>${joueurs.handling} <span>HAN</span></p>
              <p>${joueurs.speed}<span>SPD</span></p>
              <p>${joueurs.kicking}<span>KIC</span></p>
              <p>${joueurs.reflexes}<span>REF</span></p>
            </div>
          </div>
       </div>
            
`

}

    }))


}
// function filterPositon(players,position) {
//     console.log(players.players[0].position=="RW");
//     let RW = players.players.filter((player)=>{player.position=="RW"});
//     console.log(RW);
    
//   for(let i=0 ;i<players.players.length ; i++){
//     switch (player.position) {
//       case "RW":
//         console.log(`players.playrs`);
//         break;

//       case "ST":
//         console.log(`${ST}`);
//         break;
//         console.log(`${players}`);
//       case "CM":
//         console.log(`${player}`);
//         break;

//       case "CB":
//         console.log(`${player}`);
//         break;

//       case "LW":
//         console.log(`${player}`);
//         break;

//       case "CDM":
//         console.log(`${player}`);
//         break;

//       case "LB":
//         console.log(`${player}`);
//         break;

//       case "RB":
//         console.log(`${player}`);
//         break;

//       case "GK":
//         console.log(`${player}`);
//         break;
//     }
//   };
// }
// // fetchData();
const data = Fetch();
/* <_________________dragan drop__________________________> */

let DragE = null;

document.querySelectorAll(".player_card").forEach(player_card => {
  player_card.addEventListener('dragstart', (e) => {
    DragE = e.currentTarget;
    // console.log(e.currentTarget);
    // console.log(DragE);
DragE.classList.add('is-dragging');
  });

  const dropZones = document.querySelectorAll(".drapzon");   
  dropZones.forEach(boxP => {
    boxP.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  });

  dropZones.forEach(boxP => {
    boxP.addEventListener('drop', (e) => {
      e.preventDefault();
      if (DragE) {
        boxP.appendChild(DragE);
        DragE.classList.remove('is-dragging');
        DragE = null;
      }
    });
  })})
