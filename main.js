import { Player, Police } from "./Classes.js";
const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

canvas.style.background = "black";

canvas.height = 600;
canvas.width = 600;

const getDistance = (xpos1,ypos1,xpos2,ypos2) => Math.sqrt( Math.pow(xpos2-xpos1,2) + Math.pow(ypos2-ypos1,2));

function elePos(cnv) {
    var dx = cnv.offsetLeft;
    var dy = cnv.offsetTop;
    while (cnv.offsetParent) {
        cnv = cnv.offsetParent;
        dx += cnv.offsetLeft;
        dy += cnv.offsetTop;
    }
    return {"dx": dx, "dy": dy};
}

function start(){
    let countdown = 3;
    const ctdown = setInterval(() => {
        context.clearRect(0, 0, document.body.scrollWidth, document.body.scrollHeight);
        context.font = "100px Arial";
        context.fillStyle='white';
        context.fillText(countdown,280,330);
        if(countdown == 0) {
            context.clearRect(0, 0, document.body.scrollWidth, document.body.scrollHeight);
            context.font = "100px Arial";
            context.fillStyle='white';
            context.fillText("RUN",200,330);
            clearInterval(ctdown);
            setTimeout(() => game(), 1000);
        }
        else countdown -=1;
    }, 1000);
    

}

function game(){

    const police = new Police(100,100,30,"white");

    const player = new Player(300,300,30,"white");

    police.draw(context);
    player.draw(context);

    canvas.addEventListener('mousemove',(info) => {
            player.x = info.clientX-elePos(canvas).dx;
            player.y = info.clientY-elePos(canvas).dy;
        })
    
    const startTimer = Date.now();

    chasePlayer()
    const chasing = setInterval(() => {
        chasePlayer();
    }, 3000)

    function chasePlayer () {
            context.font = "30px Arial";
            context.fillStyle='white';
            const score = Date.now()-startTimer
            context.fillText(`Score : ${score}`,300,20);
            police.chase(player.x,player.y,0.5);
            if(getDistance(police.x,police.y,player.x,player.y) <= player.radius*2) {
                clearInterval(chasing);
                function out(){
                    context.clearRect(0, 0, document.body.scrollWidth, document.body.scrollHeight);
                    context.font = "70px Arial";
                    context.fillStyle='white';
                    context.fillText(`Score : ${score}`,290,300);
                    requestAnimationFrame(() => out());
                }
                out()
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }else{
                requestAnimationFrame(() => chasePlayer(player.x,player.y,2));
            }
            
        }

    
    

}

start();

