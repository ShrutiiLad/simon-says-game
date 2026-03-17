let gameSeq=[];
let userSeq=[];
let btns=['red','yellow','green','purple'];

let started= false;
let level=0;

let h2= document.querySelector("h2");
let hintbtn= document.getElementById("hint");
let hintText = document.querySelector("#hint-text");


document.addEventListener("keypress", function()
{
    if(started==false)
    {
       console.log("Game started");
       started=true;

       levelUp();
    }
});


function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function()
{
    btn.classList.remove("flash");
}, 250);
}

function userflash(btn){
    btn.classList.add("userFlash");
    setTimeout(function()
{
    btn.classList.remove("userFlash");
}, 250);
}
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;
    //random button

    let randIdx= Math.floor(Math.random()*btns.length);
    let randColor= btns[randIdx];
    let randbtn= document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randbtn);

    gameSeq.push(randColor);
    // console.log(gameSeq);
    gameflash(randbtn);

}

function checkAns(idx)
{
//   console.log("curr level ", level);
  
    if(userSeq[idx]==gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        h2.innerHTML=`Game over! Your score was <b>${level}</b>.<br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
    {
         document.querySelector("body").style.backgroundColor="white";
    },250);
        reset();
    }
}


function btnPress()
{
   
    let btn= this;
    userflash(btn);

    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allbtns= document.querySelectorAll(".btn");

for(let btn of allbtns)
{
    btn.addEventListener("click",btnPress);
}

function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

hintbtn.addEventListener("click", function () {
    hintText.innerText = "Sequence: " + gameSeq.join(" → ");
   setTimeout(function () {
    hintbtn.disabled = true;
}, 500);
});