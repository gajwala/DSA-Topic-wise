# N X N TIC-TAC-TOE

```js
const gridSize=4;
let player='X';
const board= Array(gridSize*gridSize).fill(null);


const container = document.createElement('div');
container.classList.add('container');
container.style.display='grid';
container.style.gridTemplateColumns=`repeat(${gridSize},100px)`;
container.style.gridTemplateRows=`repeat(${gridSize},100px)`;
container.style.border='1px solid black';
container.style.gap='10px';
container.style.width='fit-content';

const reset= document.createElement('button');
reset.style.color='black';
reset.textContent='Reset';
reset.style.width='100px';
reset.style.height='36px';
reset.style.padding='5px';
reset.style.marginBottom='10px';
reset.style.borderRadius="20px";

function resetclickHandler(){
  const cells= document.querySelectorAll('.cell');
  for(let cell of cells){
    cell.textContent=null;
    const idx= parseInt(cell.dataset.idx)
    board[idx]=null;
  }
}
reset.addEventListener('click',resetclickHandler)
const mainContainer= document.createElement('div');



mainContainer.appendChild(reset)




function checkWin(){
  for(let i=0;i<lines.length;i++){
    const line= lines[i];
    const firstplayer=board[line[0]];
    if(firstplayer && line.every((id)=>board[id]===firstplayer)){
      return true
    }
  }
  return false;
}

function clickHandler(e){
  const cell= e.target.closest('div');
  if(!cell) return
  if(cell.textContent) return;

  const idx= parseInt(cell.dataset.idx);
  board[idx]=player;
  cell.textContent=player;

   if(checkWin()){
    console.log(`the winner is ${player}`)
    return
   }
  player=player==='X'?'O':'X'
}
container.addEventListener('click',clickHandler)

function getLines(){
  const lines=[];
  for(let i=0;i<gridSize;i++){
       lines.push(Array.from({length:gridSize},(_,k)=>i*gridSize+k))
  }
    for(let i=0;i<gridSize;i++){
       lines.push(Array.from({length:gridSize},(_,k)=>k*gridSize+i))
  }

    lines.push(Array.from({length:gridSize},(_,k)=>k*(gridSize+1)))
    lines.push(Array.from({length:gridSize},(_,k)=>(k+1)*(gridSize-1)))

  return lines;
}

const lines= getLines()

function createBoard(){
  for(let i=0;i<board.length;i++){
    const cell= document.createElement('div');
    cell.classList.add('cell');
    cell.textContent=board[i];
    cell.dataset.idx=i;
    cell.style.border="1px solid white";
    cell.style.width='100px';
    cell.style.height='100px';
    cell.style.display='flex';
    cell.style.justifyContent="center";
    cell.style.alignItems="center";
    cell.style.fontSize='30px';
    cell.style.color="white";
    container.appendChild(cell)
     
  }
}


createBoard()

document.body.append(mainContainer,container)


```
