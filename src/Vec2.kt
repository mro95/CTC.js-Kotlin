class Vec2(
        var x: Double,
        var y: Double
) {

    operator fun times(other: Double): Vec2 {
        return Vec2(x * other, y * other)
    }

    operator fun times(other: Vec2): Vec2 {
        return Vec2(x * other.x, y * other.y)
    }

    operator fun div(other: Vec2): Vec2 {
        return Vec2(x / other.x, y / other.y)
    }

    operator fun div(other: Double): Vec2 {
        return Vec2(x / other, y / other)
    }

    operator fun minus(other: Vec2): Vec2 {
        return Vec2(x - other.x, y - other.y)
    }

    operator fun minus(other: Double): Vec2 {
        return Vec2(x - other, y - other)
    }

    operator fun plus(other: Vec2): Vec2 {
        return Vec2(x + other.x, y + other.y)
    }

    operator fun plus(other: Double): Vec2 {
        return Vec2(x + other, y + other)
    }

    fun clone(): Vec2 {
        return Vec2(x, y)
    }

    fun normalize(): Double {
        val norm = length()
        if (norm > 0.0) {
            val inv: Double = 1.0 / norm
            this.x *= inv
            this.y *= inv
        }
        return norm
    }

    fun length(): Double {
        return Math.sqrt(length2())
    }

    fun length2(): Double {
        return x * x + y * y
    }


    companion object {
        fun dot2(a: Vec2, b: Vec2): Double {
            return a.x * b.x + a.y * b.y
        }
    }
}