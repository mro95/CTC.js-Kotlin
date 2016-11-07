class Ball(
        var p: Vec2,
        var r: Double
) {
    var v = Vec2(0.0, 0.0)
    var pv = Vec2(0.0, 0.0)
    var mass = r*2
    var circle:Circle? = null

    init {
        circle = Circle(p, r)
    }

    fun update(dt:Double) {
        p += v * dt
        pv = p
        circle?.pos = p
    }

    fun bounce(other:Vec2) {
        val norm = other.clone() / 2.0
        norm.normalize()
        v -= (norm * (Vec2.dot2(v, norm) * 2.0))
    }

    fun ballBounce(other:Ball) {
        val v1 = this.v;
        val v2 = other.v;
        val mass1 = this.mass;
        val mass2 = other.mass;

        pv = v;
        this.v  = (v1 * (mass1 - mass2) + (v2 * ( mass2 * 2) )) / (mass1 + mass2);
        other.v = (v2 * (mass2 - mass1) + (v1 * ( mass1 * 2) )) / (mass1 + mass2);

//        this.p  += this.v * dt;
//        other.p += other.v * dt;
    }

    fun ballCollision(other: Ball): Boolean {
        val dr = other.r + this.r;
        if ((other.p - this.p).length2() < dr * dr) {
            return true;
        }
        return false
    }
}