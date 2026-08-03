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
