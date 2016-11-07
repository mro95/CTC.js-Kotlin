class StageCircle(
        var p: Vec2,
        r: Double
) {

    var circle = Circle(p, r)
    var color = Color(255, 255, 255, 255)

    init {
        circle.fill = false
        circle.strokeWidth = 20.0
        circle.strokeColor = color
    }

    fun ballCollision(ball: Ball): Boolean {
        val x = ball.p.x
        val y = ball.p.y
        val r = r - ball.r
        if ((x * x) + (y * y) > (r * r)) {
            return true
        }
        return false
    }

    var r: Double = r
        set(nr: Double) {
            circle.r = nr
            field = nr
        }

}