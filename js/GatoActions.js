
class GatoActions {

    constructor(canvas_selector="canvas") {
        this.canvas = document.querySelector(canvas_selector);
        this.ctx = this.canvas.getContext("2d");

        this.width = 300;
        this.height = 300;
        this.padding = 20;
        this.baseColor = "#000000";
        this.x = (this.canvas.width - this.width)/2
        this.y = (this.canvas.height - this.height)/2
        this.cuadCorners = []
        this.asignQuadCorners()
        
        this.getCanvasPos()
        window.addEventListener("resize", ()=> this.getCanvasPos())

    }

    getCanvasPos() {
        const { top, left } = this.canvas.getBoundingClientRect();
        this.top = top;
        this.left = left;
    }

    clickListener(fnc) {
        this.canvas.addEventListener("click", (e)=> fnc(e))
    }

    asignQuadCorners() {
        this.cuadCorners = []
        for (let i=0; i < 3; i++) {
            this.cuadCorners.push([])
            for (let j=0; j < 3; j++) {
                let pos = {
                    x: this.x + j*(this.width/3),
                    y: this.y + i*(this.height/3),
                    x2: this.x + j*(this.width/3) + this.width/3,
                    y2: this.y + i*(this.height/3) + this.height/3,
                }
                this.cuadCorners[i].push(pos)
            }
        }
    }

    drawBoard() {
        //ctx.fillStyle = "#FFFFFF"
        //ctx.fillRect(this.x, this.y, this.width, this.height)   
        this.ctx.strokeStyle = this.baseColor
        this.ctx.lineWidth  = 1
        // Line1
        this.ctx.beginPath()
        this.ctx.moveTo(this.x + this.width/3, this.y)
        this.ctx.lineTo(this.x + this.width/3, this.y + this.height)
        this.ctx.stroke()
        // Line2
        this.ctx.beginPath()
        this.ctx.moveTo(this.x + 2*(this.width/3), this.y)
        this.ctx.lineTo(this.x + 2*(this.width/3), this.y + this.height)
        this.ctx.stroke()
        // Line3
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y + this.height/3)
        this.ctx.lineTo(this.x + this.width, this.y + this.height/3)
        this.ctx.stroke()
        // Line4
        this.ctx.beginPath()
        this.ctx.moveTo(this.x, this.y + 2*(this.height/3))
        this.ctx.lineTo(this.x + this.width, this.y + 2*(this.height/3))
        this.ctx.stroke()
    }

    clearBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    makeMove(player, r, c) {
        this.ctx.lineWidth = 5
        let posx = this.cuadCorners[r][c].x + this.padding
        let posy = this.cuadCorners[r][c].y + this.padding
        let rectWidth = this.width/3 - this.padding*2
        let rectHeight = this.height/3 - this.padding*2
        if (player === 1) {
            this.ctx.beginPath()
            this.ctx.moveTo(posx, posy)
            this.ctx.lineTo(posx+rectWidth, posy+rectHeight)
            this.ctx.stroke()
            this.ctx.beginPath()
            this.ctx.moveTo(posx, posy+rectHeight)
            this.ctx.lineTo(posx+rectWidth, posy)
            this.ctx.stroke()

        }else if (player === -1) {
            let centerx = posx + rectWidth/2
            let centery = posy + rectHeight/2
            this.ctx.beginPath()
            this.ctx.arc(centerx, centery, rectWidth/2, 0, Math.PI*2)
            this.ctx.stroke()
        }
    }

    findCuad(mouseX, mouseY) {
        let cuadX = null;
        let cuadY = null;
        topForLoop:
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                const {x, y, x2, y2} = this.cuadCorners[i][j];
                if (( mouseX > (x + this.left) && mouseX < (x2 + this.left) ) && ( mouseY > (y + this.top) && mouseY < (y2 + this.top) )) {
                    cuadX = j;
                    cuadY = i;
                    break topForLoop;
                }
            }
        }
        return {row: cuadY, col: cuadX}
    }
}


