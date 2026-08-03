// Mission Azadi Mini Game
// Compatible with the HTML shared earlier.

const questions=[
{q:"Partition of Bengal announced in?",o:["1905","1911","1919","1942"],a:0},
{q:"Who returned to India in 1915?",o:["Tilak","Gandhi","Nehru","Bose"],a:1},
{q:"Jallianwala Bagh massacre year?",o:["1917","1918","1919","1920"],a:2},
{q:"Non-Cooperation Movement began in?",o:["1920","1922","1930","1942"],a:0},
{q:"Leader of Salt March?",o:["Patel","Gandhi","Nehru","Bose"],a:1},
{q:"Quit India Movement year?",o:["1939","1940","1942","1946"],a:2},
{q:"First PM of independent India?",o:["Patel","Rajendra Prasad","Nehru","Azad"],a:2},
{q:"Independence Day?",o:["26 Jan 1950","15 Aug 1947","9 Aug 1942","23 Mar 1931"],a:1},
{q:"Simon Commission had?",o:["Only Indians","No Indian member","Women only","Judges only"],a:1},
{q:"'Give me blood...' slogan?",o:["Bhagat Singh","Subhas Bose","Tilak","Gokhale"],a:1}
];

let current=0,score=0,lives=3;

const home=document.getElementById("homeScreen");
const game=document.getElementById("gameScreen");
const result=document.getElementById("resultScreen");
const q=document.getElementById("question");
const ans=document.getElementById("answers");

document.getElementById("startBtn").onclick=()=>{
 const n=document.getElementById("playerName").value.trim();
 if(!n){alert("Enter your name");return;}
 document.getElementById("showName").textContent=n;
 home.classList.remove("active");
 game.classList.add("active");
 load();
};

function load(){
 if(current>=questions.length||lives<=0){finish();return;}
 document.getElementById("questionNo").textContent=current+1;
 document.getElementById("score").textContent=score;
 document.getElementById("lives").textContent=lives;
 const x=questions[current];
 q.textContent=x.q;
 ans.innerHTML="";
 x.o.forEach((t,i)=>{
   const b=document.createElement("button");
   b.className="answerBtn";
   b.textContent=t;
   b.onclick=()=>check(i);
   ans.appendChild(b);
 });
}
function check(i){
 const x=questions[current];
 const btns=[...document.querySelectorAll(".answerBtn")];
 btns.forEach(b=>b.disabled=true);
 if(i===x.a){
   btns[i].classList.add("correct");
   score+=10;
 }else{
   btns[i].classList.add("wrong");
   btns[x.a].classList.add("correct");
   lives--;
 }
 setTimeout(()=>{current++;load();},800);
}
function finish(){
 game.classList.remove("active");
 result.classList.add("active");
 document.getElementById("finalName").textContent="Congratulations "+document.getElementById("playerName").value;
 document.getElementById("finalScore").textContent=score+" / "+(questions.length*10);
 let rank="Bronze";
 if(score>=80)rank="Gold";
 else if(score>=50)rank="Silver";
 document.getElementById("message").innerHTML="Rank: <b>"+rank+"</b><br>Jai Hind 🇮🇳";
 localStorage.setItem("MissionAzadiBest",Math.max(score,+(localStorage.getItem("MissionAzadiBest")||0)));
}
/*=========================================
MISSION AZADI V2
RPS GROUP OF SCHOOLS
Designed by Ms. Rashi Rohilla
=========================================*/

let playerName = "";
let difficulty = "easy";

let questionPool = [];
let currentQuestions = [];
let currentQuestion = 0;

let score = 0;
let xp = 0;
let coins = 0;
let lives = 3;

let timer = 20;
let timerInterval = null;

const loadingScreen = document.getElementById("loadingScreen");
const game = document.getElementById("game");

const enterBtn = document.getElementById("enterGame");
const startBtn = document.getElementById("startQuiz");

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");

const qNo = document.getElementById("qNo");
const timerText = document.getElementById("timer");

const xpText = document.getElementById("xp");
const livesText = document.getElementById("lives");
const coinsText = document.getElementById("coins");
const rankText = document.getElementById("rank");

const progressFill = document.getElementById("progressFill");

const resultScreen = document.getElementById("resultScreen");

const quizArea = document.getElementById("quizArea");

enterBtn.addEventListener("click",()=>{

loadingScreen.style.display="none";

game.classList.remove("hidden");

});

startBtn.addEventListener("click",startMission);

function startMission(){

playerName=document.getElementById("name").value.trim();

if(playerName===""){

alert("Please enter your name");

return;

}

difficulty=document.getElementById("difficulty").value;

document.getElementById("playerName").textContent=playerName;

questionPool=[...questions];

shuffle(questionPool);

currentQuestions=questionPool.slice(0,20);

currentQuestion=0;

score=0;

xp=0;

coins=0;

lives=3;

updateHUD();

document.querySelector(".hero").classList.add("hidden");

quizArea.classList.remove("hidden");

loadQuestion();

}

function loadQuestion(){

clearInterval(timerInterval);

timer=20;

timerText.textContent=timer;

timerInterval=setInterval(updateTimer,1000);

const q=currentQuestions[currentQuestion];

qNo.textContent=currentQuestion+1;

progressFill.style.width=((currentQuestion)/20)*100+"%";

questionBox.textContent=q.question;

answersBox.innerHTML="";

let options=[...q.options];

shuffle(options);

options.forEach(option=>{

const btn=document.createElement("button");

btn.className="answerBtn";

btn.textContent=option;

btn.onclick=()=>checkAnswer(btn,q.answer);

answersBox.appendChild(btn);

});

}

function checkAnswer(button,correct){

clearInterval(timerInterval);

const buttons=document.querySelectorAll(".answerBtn");

buttons.forEach(b=>b.disabled=true);

if(button.textContent===correct){

button.classList.add("correct");

score++;

xp+=20;

coins+=10;

}else{

button.classList.add("wrong");

lives--;

buttons.forEach(b=>{

if(b.textContent===correct){

b.classList.add("correct");

}

});

}

updateHUD();

setTimeout(nextQuestion,1500);

}

function nextQuestion(){

if(lives<=0){

finishGame();

return;

}

currentQuestion++;

if(currentQuestion>=20){

finishGame();

return;

}

loadQuestion();

}

function updateTimer(){

timer--;

timerText.textContent=timer;

if(timer<=0){

clearInterval(timerInterval);

lives--;

updateHUD();

setTimeout(nextQuestion,800);

}

}

function updateHUD(){

xpText.textContent=xp;

livesText.textContent=lives;

coinsText.textContent=coins;

rankText.textContent=getRank();

}
/*=========================================
MISSION AZADI V2
SCRIPT.JS PART 2
=========================================*/

function finishGame(){

clearInterval(timerInterval);

quizArea.classList.add("hidden");

resultScreen.classList.remove("hidden");

let accuracy=Math.round((score/20)*100);

document.getElementById("finalPlayer").textContent=playerName;

document.getElementById("finalScore").textContent=score;

document.getElementById("accuracy").textContent=accuracy+"%";

document.getElementById("earnedXP").textContent=xp;

document.getElementById("earnedCoins").textContent=coins;

document.getElementById("finalRank").textContent=getRank();

document.getElementById("resultTitle").textContent=getRank();

document.getElementById("certificateName").textContent=playerName;

document.getElementById("certificateScore").textContent=score+"/20";

document.getElementById("certificatePercent").textContent=accuracy+"%";

document.getElementById("certificateRank").textContent=getRank();

saveLeaderboard();

launchFireworks();

}

function getRank(){

if(xp>=350) return "🏆 Legend of Azadi";

if(xp>=250) return "🥇 Freedom Fighter";

if(xp>=180) return "🥈 Patriot";

if(xp>=80) return "🥉 Volunteer";

return "Cadet";

}

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

}

function saveLeaderboard(){

let board=JSON.parse(localStorage.getItem("azadiBoard"))||[];

board.push({

name:playerName,

score:score,

xp:xp,

date:new Date().toLocaleDateString()

});

board.sort((a,b)=>b.score-a.score);

board=board.slice(0,10);

localStorage.setItem("azadiBoard",JSON.stringify(board));

displayLeaderboard();

}

function displayLeaderboard(){

const body=document.getElementById("leaderboardTable");

if(!body) return;

body.innerHTML="";

let board=JSON.parse(localStorage.getItem("azadiBoard"))||[];

board.forEach((item,index)=>{

body.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${item.name}</td>

<td>${item.score}/20</td>

</tr>

`;

});

}

document.getElementById("leaderboardBtn").onclick=function(){

document.getElementById("leaderboard").classList.remove("hidden");

displayLeaderboard();

};

document.getElementById("closeLeaderboard").onclick=function(){

document.getElementById("leaderboard").classList.add("hidden");

};

document.getElementById("playAgain").onclick=function(){

location.reload();

};

document.getElementById("showCertificate").onclick=function(){

resultScreen.classList.add("hidden");

document.getElementById("certificateScreen").classList.remove("hidden");

};

document.getElementById("backHome").onclick=function(){

location.reload();

};

function launchFireworks(){

const box=document.getElementById("fireworks");

if(!box) return;

box.innerHTML="";

for(let i=0;i<40;i++){

let spark=document.createElement("div");

spark.style.position="fixed";

spark.style.width="8px";

spark.style.height="8px";

spark.style.borderRadius="50%";

spark.style.left=Math.random()*100+"vw";

spark.style.top=Math.random()*100+"vh";

spark.style.background=`hsl(${Math.random()*360},100%,60%)`;

spark.style.pointerEvents="none";

spark.style.animation="explode 1.8s ease-out forwards";

box.appendChild(spark);

}

setTimeout(()=>{

box.innerHTML="";

},2000);

}

function createParticles(){

const area=document.getElementById("particles");

if(!area) return;

for(let i=0;i<40;i++){

let p=document.createElement("span");

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=(5+Math.random()*6)+"s";

p.style.animationDelay=Math.random()*5+"s";

area.appendChild(p);

}

}

window.onload=function(){

createParticles();

displayLeaderboard();

};

document.addEventListener("keydown",function(e){

if(e.key==="Enter" && document.querySelector(".hero") && !document.querySelector(".hero").classList.contains("hidden")){

startMission();

}

});
