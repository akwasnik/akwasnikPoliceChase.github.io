const getRand = (min,max) => Math.floor(Math.random() * (max-min)) + min;

export class Police{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(context){
        context.clearRect(0, 0, this.x*this.radius, this.y*this.radius);
        context.beginPath();
        context.shadowBlur=getRand(20,35);
        context.shadowColor=`rgb(${getRand(100,255)},0,${getRand(100,255)})`;
        context.shadowOffsetX=getRand(-1,1);
        context.shadowOffsetY=getRand(-1,1);
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        context.fill();
        context.closePath();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font='15px monospacje';
        context.fillStyle = "black";
        context.fillText("POLICE", this.x, this.y);
        requestAnimationFrame(() => this.draw(context))
    }

    chase(xpos,ypos,speed,cb){
            switch(true){
                case (this.x < xpos && this.y < ypos):
                    this.x += speed;
                    this.y += speed;
                    break;
                case (this.x < xpos && this.y > ypos):
                    this.x += speed;
                    this.y -= speed;
                    break;
                case (this.x > xpos && this.y < ypos):
                    this.x -= speed;
                    this.y += speed;
                    break;
                case (this.x > xpos && this.y > ypos):
                    this.x -= speed;
                    this.y -= speed;
                    break;
                case (this.x < xpos && this.y === ypos):
                    this.x += speed;
                    break;
                case (this.x > xpos && this.y === ypos):
                    this.x -= speed;
                    break;
                case (this.x === xpos && this.y < ypos):
                    this.y += speed;
                    break;
                case (this.x === xpos && this.y > ypos):
                    this.y -= speed;
                    break;
                default:
                    console.log(10);
                    break;
                }
    }
}

export class Player{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(context){
            context.beginPath();
            context.shadowBlur=0;
            context.shadowColor=`black`;
            context.shadowOffsetX=0;
            context.shadowOffsetY=0;
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
            context.fill();
            context.closePath();
            
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font='15px monospacje';
            context.fillStyle = "black";
            context.fillText("PLAYER", this.x, this.y);
            requestAnimationFrame(() => this.draw(context))
            
        }
    }
