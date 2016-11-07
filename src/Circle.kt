import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement

class Circle(
        var pos:Vec2,
        var r:Double
) {

    var color = Color(0, 0, 0, 255)
    var strokeColor = Color(0, 0, 0, 255)
    var strokeWidth = 0.0
    var fill = true

    init {

    }

    fun draw(ctx:CanvasRenderingContext2D, canvas:HTMLCanvasElement) {
        ctx.strokeStyle = "rgba("+this.strokeColor.r+','+this.strokeColor.g+','+this.strokeColor.b+','+this.strokeColor.a+')';
        ctx.fillStyle = "rgba("+this.color.r+','+this.color.g+','+this.color.b+','+this.color.a+')';
        ctx.lineWidth = this.strokeWidth.toDouble();
        ctx.beginPath();
        ctx.arc(canvas.width/2.0+this.pos.x, canvas.height/2.0+this.pos.y, this.r.toDouble(), 0.0, Math.PI*2, true);
        if(this.fill)
            ctx.fill();
        if(this.strokeWidth > 0)
            ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1.0;
    }
}