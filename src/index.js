//*************** GLOBAL VARIABLES ***************//

let mapGrid = []
let board = []
var gameBoard = document.querySelector(".game-board")
let currentAstroPosition
let winPosition
//GP NOTE TO SELF: FIND A WAY TO ABSTRACT WHAT MAP WE ARE CURRENTLY PLAYING IN
// console.log(currentAstroPosition, winPosition);

const astronaut = `<img id="astronaut" src="assets/astroman.png">`
const alien = `<img class='shake-slow shake-constant' src="assets/alien.png">`
const homebase = `<img id="spaceship" src="assets/spaceship.png">`


const availableMoves = document.querySelector("#b1")
const movesRemaining = document.querySelector("#b2")

//*************** GLOBAL VARIABLES ***************//


//*************** BEGINNING OF DOM EVENT LISTENER ***************//
document.addEventListener("DOMContentLoaded", () => {

const endPoint = 'http://localhost:3000/api/v1/maps'

// introModal()

//*************** BEGINNING OF FETCH ***************//
fetch(endPoint)
  .then(response => response.json())
  .then(data => {
    mapGrid = data

    // let nineSquare = mapGrid.filter( map => map.size === 9 )
    // let map1 = nineSquare[2].layout
    let sixteenSquare = mapGrid.filter( map => map.size === 16)
    let map4 = sixteenSquare[0].layout
    let map5 = sixteenSquare[1].layout
    let map6 = sixteenSquare[2].layout
    // let twentyFiveSquare = mapGrid.filter( map => map.size === 25)
    // let map7 = twentyFiveSquare[0].layout
    // console.log(mapGrid);
    // console.log(nineSquare);
    // console.log(map4)
    foreachLoopTrial(map5) // FUNCTION TO RENDER THE MAP

    currentAstroPosition = parseInt(document.getElementById("astronaut").parentElement.id)
    winPosition = parseInt(document.getElementById("spaceship").parentElement.id)
    // console.log(currentAstroPosition, winPosition);
  })
  //*************** END OF FETCH ***************//




  //Diane's code (adjusting DOM content to reflect certain HTML/CSS assets)
// dragula library

// el - the item that is being dropped
//
// target - the container on which the item is being dropped
//
// source - the container from which the item was dragged
//
// sibling - the item in the target container before which the item is being dropped, null if being dropped as last item

// dragula([availableMoves, movesRemaining])

 var drake = dragula([availableMoves, movesRemaining], {
    copy: true,
  });

  dragula([movesRemaining], {
    removeOnSpill: true,
  });



//*************** END OF DRAG START LISTENER ***************//
drake.on('drag', function(el,source) {
  // console.log("HEY", source, el)
  document.getElementsByTagName('body')[0].style.backgroundColor = '#28a0ef';

})
  //makes a copy of the dragged event
//*************** END OF DRAG START LISTENER ***************//

//*************** BEGINNING OF DRAG DROP LISTENER ***************//

drake.on('drop', function(el, target){

  if(el.id === 'up-event'){
    console.log("DROP TARGET", el, target, winPosition)
    el.style.border = '2px dashed white';
    document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
    //compare the div id of the currentAstroPosition against the legal moves of the current map and asking 1st if the up move is an integer and if so, move the astronaut to the value of up
    if(map5LegalMoves[currentAstroPosition].up === 0)
    //CONFIRMING IF LEGAL MOVE HERE
    {
      console.log("game over");
      //GP TO DO: call lose modal *****
    }
    if(map5LegalMoves[currentAstroPosition].up === "win"){
      console.log("you win");
    }
    else{
      console.log("legal move");
      let newAstroPosition = map5LegalMoves[currentAstroPosition].up
      let newDiv = document.getElementById(`${newAstroPosition}`)
      let oldDiv = document.getElementById(`${currentAstroPosition}`)
      console.log(newAstroPosition, oldDiv, newDiv);
      newDiv.innerHTML += astronaut
      oldDiv.innerHTML = ""
      currentAstroPosition = newAstroPosition
    }



  }
  if(el.id === 'down-event'){
    console.log("DOWN", el, target)
        el.style.border = '2px dashed white';

        if(map5LegalMoves[currentAstroPosition].down === 0) //CONFIRMING IF LEGAL MOVE HERE
        {
          console.log("game over");
                //GP TO DO: call lose modal *****
        }
        if(map5LegalMoves[currentAstroPosition].down === "win"){
          console.log("you win");
        }
        else{
          console.log("legal move");
          let newAstroPosition = map5LegalMoves[currentAstroPosition].down
          let newDiv = document.getElementById(`${newAstroPosition}`)
          let oldDiv = document.getElementById(`${currentAstroPosition}`)
          console.log(newAstroPosition, oldDiv, newDiv);
          newDiv.innerHTML += astronaut
          oldDiv.innerHTML = ""
          currentAstroPosition = newAstroPosition
        }
  }
  if(el.id === 'left-event'){
    console.log("LEFT")
    el.style.border = '2px dashed white';

    if(map5LegalMoves[currentAstroPosition].left === 0)
    //CONFIRMING IF LEGAL MOVE HERE
    {
      console.log("game over");
            //GP TO DO: call lose modal *****
    }
    if(map5LegalMoves[currentAstroPosition].left === "win"){
      console.log("you win");
    }
    else{
      console.log("legal move");
      let newAstroPosition = map5LegalMoves[currentAstroPosition].left
      let newDiv = document.getElementById(`${newAstroPosition}`)
      let oldDiv = document.getElementById(`${currentAstroPosition}`)
      console.log(newAstroPosition, oldDiv, newDiv);
      newDiv.innerHTML += astronaut
      oldDiv.innerHTML = ""
      currentAstroPosition = newAstroPosition
    }
  }

  if(el.id === 'right-event'){
    console.log("RIGHT")
    el.style.border = '2px dashed white';
      document.getElementsByTagName('body')[0].style.backgroundColor = 'black';


          if(map5LegalMoves[currentAstroPosition].right === 0)
          //CONFIRMING IF LEGAL MOVE HERE
          {
            console.log("game over");
                  //GP TO DO: call lose modal *****
          }
          if(map5LegalMoves[currentAstroPosition].right === "win"){
            console.log("you win");
          }
          else{
            console.log("legal move");
            let newAstroPosition = map5LegalMoves[currentAstroPosition].right
            let newDiv = document.getElementById(`${newAstroPosition}`)
            let oldDiv = document.getElementById(`${currentAstroPosition}`)
            console.log(newAstroPosition, oldDiv, newDiv);
            newDiv.innerHTML += astronaut
            oldDiv.innerHTML = ""
            currentAstroPosition = newAstroPosition
          }
  }
})
//*************** END OF DRAG DROP LISTENER ***************//


})
//*************** END OF DOM EVENT LISTENER ***************//

// function newGridLoop(array){
//   for(let element of array){
//     if(element === 0){
//       gameBoard.innerHTML += renderFreeHTML(element)
//     } if(element === 1) {
//       gameBoard.innerHTML += renderAlienHTML(element)
//     }
//      if(element === 2){
//       gameBoard.innerHTML += renderStartHTML(element)
//     }
//     if (element === 3){
//       gameBoard.innerHTML += renderFinishHTML(element)
//     }
//   }
// }
let tileId = 0

function foreachLoopTrial(map){
  for(let array of map){
    array.map(element => {
      if(element === 0){
        tileId++
        gameBoard.innerHTML += renderFreeHTML(element)
      }
      if(element === 1) {
        tileId++
        gameBoard.innerHTML += renderAlienHTML(element)
      }
      if(element === 2){
        tileId++
        gameBoard.innerHTML += renderStartHTML(element)
      }
      if(element === 3){
        tileId++
        gameBoard.innerHTML += renderFinishHTML(element)
      }
    })
  }
}

// function xycoords() {
//   const rows =  4
//   const columns = 4
//   for (let rowId = 0; rowId<rows; rowId++) {
//     const column = []
//     for (let columnId = 0;columnId<rows;columnId++) {
//       column.push({x:rowId, y:columnId})
//     }
//     board.push(column)
//   }
//   return board
// }
// xycoords()
// console.log(board);

function renderFreeHTML(element){
  return `
  <div id="${tileId}" class="box"></div>
  `
}

function renderAlienHTML(element){
  return `
  <div id="${tileId}" class="box">${alien}</div>
  `
}

function renderStartHTML(element){
  return `
  <div id="${tileId}" class="box">${astronaut}</div>
  `
}

function renderFinishHTML(element){
  return `
  <div id="${tileId}" class="box">${homebase}</div>
  `
}
