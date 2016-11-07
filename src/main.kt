import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.Element
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.RenderingContext
import kotlin.browser.document
import kotlin.browser.window
import kotlin.dom.get

class Mainloop() {

    var canvas: HTMLCanvasElement? = null
    var ctx: CanvasRenderingContext2D? = null

    var lastTime: Double = 0.0
    var currentTime: Double = 0.0
    var running = true

    var balls: Array<Ball> = arrayOf()
    var stageCircle = StageCircle(Vec2(0.0, 0.0), 0.0)

    init {
        canvas = document.createElement("canvas") as HTMLCanvasElement
        ctx = canvas?.getContext("2d") as CanvasRenderingContext2D
        ctx?.canvas?.width = window["innerWidth"] - 50
        ctx?.canvas?.height = window["innerHeight"] - 50
        document.body!!.appendChild(canvas!!)

        window.document.bgColor = "#000000"
    }

    fun start() {
        currentTime = Date().getTime().toDouble()
        stageCircle.r = 400.0
        createBalls(5)
        loop()
    }

    fun loop() {
        lastTime = currentTime;
        currentTime = Date().getTime().toDouble()
        val dt = (currentTime - lastTime) / 1000
        val dt2 = dt/20
        for (i in (0..20)) {
            update(dt2)
        }
        //update(dt)
        render()

        if (running) {
            window.requestAnimationFrame { this.loop() }
        }
    }

    fun update(dt: Double) {
        for (ball in balls) {
            ball.update(dt)
        }
        for (i in (0..balls.size - 1)) {
            val ball = balls[i]
            if (stageCircle.ballCollision(ball)) {
                ball.bounce(ball.p);
            }
            for (j in (i + 1..balls.size - 1)) {
                val other = balls[j]
                if (other.ballCollision(ball)) {
                    other.ballBounce(ball)
                }
            }
        }
    }

    fun render() {
        clearStage()
        stageCircle.circle.draw(ctx!!, canvas!!)
        for(ball in balls) {
            ball.circle!!.draw(ctx!!, canvas!!)
        }
    }

    fun clearStage() {
        ctx?.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
        ctx?.clearRect(0.0, 0.0, canvas!!.width.toDouble(), canvas!!.height.toDouble())
        ctx?.restore()
    }

    fun situation1() {
        balls[0] = Ball(Vec2(0.0, 0.0), 20.0)
        balls[0].v = Vec2(-150.0, 0.0)
        balls[0].circle?.color = Color(255, 0, 0, 255)

        balls[1] = Ball(Vec2(-150.0, 0.0), 20.0)
        balls[1].v = Vec2(150.0, 0.0)
        balls[1].circle?.color = Color(0, 0, 255, 255)
    }

    fun createBalls(amount: Int) {
        for(i in (0..amount)) {
            var isUnique = false
            while (!isUnique) {
                var mass = randNr(50.0, 200.0)
                var b = Ball(Vec2(randNr(-200.0,200.0),randNr(-200.0,200.0)), mass/5)

            }
        }
    }

    fun randNr(min: Int, max: Int): Int {
        return (Math.random() * (max - min) + min).toInt()
    }

    fun randNr(min: Double, max: Double): Double {
        return Math.random() * (max - min) + min
    }
}

val main = Mainloop()
val start = main.start()