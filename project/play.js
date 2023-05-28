const levelDisplay = document.querySelector("#level");
const msg = document.querySelector("#msg");
const battlepic = document.querySelector("#battlepic");
const hitPoints = document.querySelector("#HP");
const sword = document.querySelector("#sword");
const bow = document.querySelector("#bow");
const wand = document.querySelector("#wand");
const next = document.querySelector("#next");
const attack = document.querySelector("#power");

const monsters = [
    {name:"Blob",img:"images/Blob.png"},
    {name:"Drake",img:"images/Drake.png"},
    {name:"Goblin",img:"images/Goblin.png"},
    {name:"Golem",img:"images/Golem.png"},
    {name:"Headless",img:"images/Knight.png"},
    {name:"Vilebloom",img:"images/Plant.png"},
    {name:"Skeleton",img:"images/Skeleton.png"},
    {name:"Spider",img:"images/Spider.png"},
    {name:"Spook",img:"images/Spook.png"}
]

let level = 1;
let hp = 30;
let foeHP = rng(5, 10);
let swordAtk = -2;
let bowAtk = -3;
let wandAtk = -4;
let foe = rng(0,monsters.length);
let reward = false;

let message = "You encounter a "+monsters[foe].name+"!";
let atkMsg = swordAtk+" | "+bowAtk+" | "+wandAtk;
let actionPic = monsters[foe].img

update();

function rng(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function update(){
    levelDisplay.innerHTML = "Level "+level;
    msg.innerHTML = message;
    battlepic.src = actionPic;
    hitPoints.innerHTML = "You: "+hp+"HP // Foe: "+foeHP+"HP";
    attack.innerHTML = atkMsg;
}

function animate(){
    battlepic.style.opacity = 0.2;
    setTimeout(() => {battlepic.style.opacity = 0.6}, 50);
    setTimeout(() => {battlepic.style.opacity = 0.8}, 100);
    setTimeout(() => {battlepic.style.opacity = 1}, 150);
}

function action(pick){
    switch(pick){
        case "sword":
            foeHP+=swordAtk;
            break;
        case "bow":
            foeHP+=bowAtk;
            break;
        case "wand":
            foeHP+=wandAtk;
            break;  
        case "next":
            hp += foeHP;
            if (hp > 0){
                if (reward){
                    //UPGRADE
                    foeHP = 1;
                    swordAtk += -2;
                    bowAtk += -2;
                    wandAtk += rng(-2,-5);
                    hitPoints.style.visibility = "hidden";
                    message = "You loot some stronger weapons, and gain some HP!";
                    hp += level;
                    actionPic = "images/Loot.png";
                    atkMsg = "Continue";
                    reward = false;
                    hp --;
                }
                else{
                    //NEXT FOE
                    sword.style.display = "unset";
                    bow.style.display = "unset";
                    wand.style.display = "unset";
                    next.style.display = "none";
                    hitPoints.style.visibility = "visible";

                    level ++;
                    foeHP = rng(level*2, level*5);
                    foe = rng(0,monsters.length);
                    message = "You encounter a "+monsters[foe].name+"!";
                    actionPic = monsters[foe].img;
                    atkMsg = swordAtk+" | "+bowAtk+" | "+wandAtk;
                    reward = false;
                }
            }
            else{
                //GAME OVER
                foeHP = 1;
                sword.style.visibility = "hidden";
                bow.style.visibility = "hidden";
                wand.style.visibility = "hidden";
                next.style.visibility = "hidden";
                hitPoints.style.visibility = "hidden";
                actionPic = "images/GameOver.png";
                message = "Unfortunately, you perish...";
                atkMsg = 'Click"Reset Game" in the top right to try again.';
            }  
            break;
    } 
    animate();
    if (foeHP < 1){
        //FOE DEATH
        message = "You fell your foe!";
        actionPic = "images/Pow.png";
        atkMsg = "Continue";
        sword.style.display = "none";
        bow.style.display = "none";
        wand.style.display = "none";
        next.style.display = "unset";
        if (level%5 == 0){
            reward = true;
        }
    }
    update();
}

sword.addEventListener("click", function () {action("sword")});
bow.addEventListener("click", function () {action("bow")});
wand.addEventListener("click", function () {action("wand")});
next.addEventListener("click", function () {action("next")});