const allowedKeys = ["Q","W","E","A","S","D","F","H","J","K","L"]

let sequence = []
let userIndex = 0
let seqNumber = 1
let timer

const inputRow = document.getElementById("inputRow")
const targetKey = document.getElementById("targetKey")
const message = document.getElementById("message")
const seqText = document.getElementById("seq")
const timerBar = document.getElementById("timerBar")

function generateSequence(){

sequence=[]
userIndex=0
inputRow.innerHTML=""
message.textContent=""

for(let i=0;i<8;i++){
sequence.push(
allowedKeys[Math.floor(Math.random()*allowedKeys.length)]
)
}

targetKey.textContent = sequence[0]

startTimer()
}

function startTimer(){

clearInterval(timer)

let time

// Set time based on sequence
if(seqNumber === 1){
    time = 10
}else if(seqNumber === 2){
    time = 5
}else if(seqNumber === 3){
    time = 3
}

let total = time

timerBar.style.width = "100%"

timer = setInterval(()=>{

time -= 0.1

if(time < 0){
    time = 0
}

timerBar.style.width = (time/total)*100 + "%"

if(time === 0){

clearInterval(timer)
failGame()

}

},100)

}
function failGame(){

message.textContent="FAILED - Try Again"

clearInterval(timer)

setTimeout(()=>{
seqNumber=1
seqText.textContent=1
generateSequence()
},2000)

}

document.addEventListener("keydown",(e)=>{

let key=e.key.toUpperCase()

if(!allowedKeys.includes(key)) return

let box=document.createElement("div")
box.textContent=key
inputRow.appendChild(box)

if(key===sequence[userIndex]){

userIndex++

targetKey.textContent=sequence[userIndex]

if(userIndex===8){

clearInterval(timer)

if(seqNumber===3){

message.textContent="SUCCESS"
return

}

seqNumber++
seqText.textContent=seqNumber

setTimeout(()=>{
generateSequence()
},1000)

}

}else{

failGame()

}

})


generateSequence()
