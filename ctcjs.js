(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(function () {
    this.main = new _.Mainloop();
    this.start = _.main.start();
  }, /** @lends _ */ {
    Ball: Kotlin.createClass(null, function (p, r) {
      this.p = p;
      this.r = r;
      this.v = new _.Vec2(0.0, 0.0);
      this.pv = new _.Vec2(0.0, 0.0);
      this.mass = this.r * 2;
      this.circle = null;
      this.circle = new _.Circle(this.p, this.r);
    }, /** @lends _.Ball.prototype */ {
      update_14dthe$: function (dt) {
        var tmp$0;
        this.p = this.p.plus_1l266$(this.v.times_14dthe$(dt));
        this.pv = this.p;
        (tmp$0 = this.circle) != null ? (tmp$0.pos = this.p) : null;
      },
      bounce_1l266$: function (other) {
        var norm = other.clone().div_14dthe$(2.0);
        norm.normalize();
        this.v = this.v.minus_1l266$(norm.times_14dthe$(_.Vec2.Companion.dot2_sx680k$(this.v, norm) * 2.0));
      },
      ballBounce_187q7$: function (other) {
        var v1 = this.v;
        var v2 = other.v;
        var mass1 = this.mass;
        var mass2 = other.mass;
        this.pv = this.v;
        this.v = v1.times_14dthe$(mass1 - mass2).plus_1l266$(v2.times_14dthe$(mass2 * 2)).div_14dthe$(mass1 + mass2);
        other.v = v2.times_14dthe$(mass2 - mass1).plus_1l266$(v1.times_14dthe$(mass1 * 2)).div_14dthe$(mass1 + mass2);
      },
      ballCollision_187q7$: function (other) {
        var dr = other.r + this.r;
        if (other.p.minus_1l266$(this.p).length2() < dr * dr) {
          return true;
        }
        return false;
      }
    }),
    Color: Kotlin.createClass(null, function (r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }),
    Circle: Kotlin.createClass(null, function (pos, r) {
      this.pos = pos;
      this.r = r;
      this.color = new _.Color(0, 0, 0, 255);
      this.strokeColor = new _.Color(0, 0, 0, 255);
      this.strokeWidth = 0.0;
      this.fill = true;
    }, /** @lends _.Circle.prototype */ {
      draw_gseyt6$: function (ctx, canvas) {
        ctx.strokeStyle = 'rgba(' + this.strokeColor.r + ',' + this.strokeColor.g + ',' + this.strokeColor.b + ',' + this.strokeColor.a + ')';
        ctx.fillStyle = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
        ctx.lineWidth = this.strokeWidth;
        ctx.beginPath();
        ctx.arc(canvas.width / 2.0 + this.pos.x, canvas.height / 2.0 + this.pos.y, this.r, 0.0, Math.PI * 2, true);
        if (this.fill)
          ctx.fill();
        if (this.strokeWidth > 0)
          ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1.0;
      }
    }),
    Vec2: Kotlin.createClass(null, function (x, y) {
      this.x = x;
      this.y = y;
    }, /** @lends _.Vec2.prototype */ {
      times_14dthe$: function (other) {
        return new _.Vec2(this.x * other, this.y * other);
      },
      times_1l266$: function (other) {
        return new _.Vec2(this.x * other.x, this.y * other.y);
      },
      div_1l266$: function (other) {
        return new _.Vec2(this.x / other.x, this.y / other.y);
      },
      div_14dthe$: function (other) {
        return new _.Vec2(this.x / other, this.y / other);
      },
      minus_1l266$: function (other) {
        return new _.Vec2(this.x - other.x, this.y - other.y);
      },
      minus_14dthe$: function (other) {
        return new _.Vec2(this.x - other, this.y - other);
      },
      plus_1l266$: function (other) {
        return new _.Vec2(this.x + other.x, this.y + other.y);
      },
      plus_14dthe$: function (other) {
        return new _.Vec2(this.x + other, this.y + other);
      },
      clone: function () {
        return new _.Vec2(this.x, this.y);
      },
      normalize: function () {
        var norm = this.length();
        if (norm > 0.0) {
          var inv = 1.0 / norm;
          this.x = this.x * inv;
          this.y = this.y * inv;
        }
        return norm;
      },
      length: function () {
        return Math.sqrt(this.length2());
      },
      length2: function () {
        return this.x * this.x + this.y * this.y;
      }
    }, /** @lends _.Vec2 */ {
      Companion: Kotlin.createObject(null, null, /** @lends _.Vec2.Companion.prototype */ {
        dot2_sx680k$: function (a, b) {
          return a.x * b.x + a.y * b.y;
        }
      }),
      object_initializer$: function () {
        _.Vec2.Companion;
      }
    }),
    StageCircle: Kotlin.createClass(null, function (p, r) {
      this.p = p;
      this.circle = new _.Circle(this.p, r);
      this.color = new _.Color(255, 255, 255, 255);
      this.circle.fill = false;
      this.circle.strokeWidth = 20.0;
      this.circle.strokeColor = this.color;
      this.$r_mjug4u$ = r;
    }, /** @lends _.StageCircle.prototype */ {
      ballCollision_187q7$: function (ball) {
        var x = ball.p.x;
        var y = ball.p.y;
        var r = this.r - ball.r;
        if (x * x + y * y > r * r) {
          return true;
        }
        return false;
      },
      r: {
        get: function () {
          return this.$r_mjug4u$;
        },
        set: function (nr) {
          this.circle.r = nr;
          this.$r_mjug4u$ = nr;
        }
      }
    }),
    Mainloop: Kotlin.createClass(null, function () {
      var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7, tmp$8;
      this.canvas = null;
      this.ctx = null;
      this.lastTime = 0.0;
      this.currentTime = 0.0;
      this.running = true;
      this.balls = [];
      this.stageCircle = new _.StageCircle(new _.Vec2(0.0, 0.0), 0.0);
      this.canvas = Kotlin.isType(tmp$0 = document.createElement('canvas'), HTMLCanvasElement) ? tmp$0 : Kotlin.throwCCE();
      this.ctx = Kotlin.isType(tmp$2 = (tmp$1 = this.canvas) != null ? tmp$1.getContext('2d') : null, CanvasRenderingContext2D) ? tmp$2 : Kotlin.throwCCE();
      (tmp$4 = (tmp$3 = this.ctx) != null ? tmp$3.canvas : null) != null ? (tmp$4.width = window['innerWidth'] - 50) : null;
      (tmp$6 = (tmp$5 = this.ctx) != null ? tmp$5.canvas : null) != null ? (tmp$6.height = window['innerHeight'] - 50) : null;
      ((tmp$7 = document.body) != null ? tmp$7 : Kotlin.throwNPE()).appendChild((tmp$8 = this.canvas) != null ? tmp$8 : Kotlin.throwNPE());
      window.document.bgColor = '#000000';
    }, /** @lends _.Mainloop.prototype */ {
      start: function () {
        this.currentTime = (new Date()).getTime();
        this.stageCircle.r = 400.0;
        this.createBalls_za3lpa$(5);
        this.loop();
      },
      loop: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3;
        this.lastTime = this.currentTime;
        this.currentTime = (new Date()).getTime();
        var dt = (this.currentTime - this.lastTime) / 1000;
        var dt2 = dt / 20;
        tmp$0 = new Kotlin.NumberRange(0, 20), tmp$1 = tmp$0.first, tmp$2 = tmp$0.last, tmp$3 = tmp$0.step;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          this.update_14dthe$(dt2);
        }
        this.render();
        if (this.running) {
          window.requestAnimationFrame(_.Mainloop.loop$f(this));
        }
      },
      update_14dthe$: function (dt) {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7, tmp$8, tmp$9, tmp$10;
        tmp$0 = this.balls, tmp$1 = tmp$0.length;
        for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
          var ball = tmp$0[tmp$2];
          ball.update_14dthe$(dt);
        }
        tmp$3 = new Kotlin.NumberRange(0, this.balls.length - 1), tmp$4 = tmp$3.first, tmp$5 = tmp$3.last, tmp$6 = tmp$3.step;
        for (var i = tmp$4; i <= tmp$5; i += tmp$6) {
          var ball_0 = this.balls[i];
          if (this.stageCircle.ballCollision_187q7$(ball_0)) {
            ball_0.bounce_1l266$(ball_0.p);
          }
          tmp$7 = new Kotlin.NumberRange(i + 1, this.balls.length - 1), tmp$8 = tmp$7.first, tmp$9 = tmp$7.last, tmp$10 = tmp$7.step;
          for (var j = tmp$8; j <= tmp$9; j += tmp$10) {
            var other = this.balls[j];
            if (other.ballCollision_187q7$(ball_0)) {
              other.ballBounce_187q7$(ball_0);
            }
          }
        }
      },
      render: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7;
        this.clearStage();
        this.stageCircle.circle.draw_gseyt6$((tmp$0 = this.ctx) != null ? tmp$0 : Kotlin.throwNPE(), (tmp$1 = this.canvas) != null ? tmp$1 : Kotlin.throwNPE());
        tmp$2 = this.balls, tmp$3 = tmp$2.length;
        for (var tmp$4 = 0; tmp$4 !== tmp$3; ++tmp$4) {
          var ball = tmp$2[tmp$4];
          ((tmp$5 = ball.circle) != null ? tmp$5 : Kotlin.throwNPE()).draw_gseyt6$((tmp$6 = this.ctx) != null ? tmp$6 : Kotlin.throwNPE(), (tmp$7 = this.canvas) != null ? tmp$7 : Kotlin.throwNPE());
        }
      },
      clearStage: function () {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4;
        (tmp$0 = this.ctx) != null ? tmp$0.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0) : null;
        (tmp$3 = this.ctx) != null ? tmp$3.clearRect(0.0, 0.0, ((tmp$1 = this.canvas) != null ? tmp$1 : Kotlin.throwNPE()).width, ((tmp$2 = this.canvas) != null ? tmp$2 : Kotlin.throwNPE()).height) : null;
        (tmp$4 = this.ctx) != null ? tmp$4.restore() : null;
      },
      situation1: function () {
        var tmp$0, tmp$1;
        this.balls[0] = new _.Ball(new _.Vec2(0.0, 0.0), 20.0);
        this.balls[0].v = new _.Vec2(-150.0, 0.0);
        (tmp$0 = this.balls[0].circle) != null ? (tmp$0.color = new _.Color(255, 0, 0, 255)) : null;
        this.balls[1] = new _.Ball(new _.Vec2(-150.0, 0.0), 20.0);
        this.balls[1].v = new _.Vec2(150.0, 0.0);
        (tmp$1 = this.balls[1].circle) != null ? (tmp$1.color = new _.Color(0, 0, 255, 255)) : null;
      },
      createBalls_za3lpa$: function (amount) {
        var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6, tmp$7;
        tmp$0 = new Kotlin.NumberRange(0, amount), tmp$1 = tmp$0.first, tmp$2 = tmp$0.last, tmp$3 = tmp$0.step;
        for (var i = tmp$1; i <= tmp$2; i += tmp$3) {
          var isUnique = false;
          var counter = 0;
          while (!isUnique) {
            if (counter > 1000) {
              isUnique = true;
              window.alert('FUCK!');
            }
            counter++;
            var mass = this.randNr_lu1900$(50.0, 200.0);
            var b1 = new _.Ball(new _.Vec2(this.randNr_lu1900$(-200.0, 200.0), this.randNr_lu1900$(-200.0, 200.0)), mass / 5);
            b1.v = new _.Vec2(this.randNr_lu1900$(-200.0, 200.0), this.randNr_lu1900$(-200.0, 200.0));
            (tmp$4 = b1.circle) != null ? (tmp$4.color = new _.Color(this.randNr_vux9f0$(0, 255), this.randNr_vux9f0$(0, 255), this.randNr_vux9f0$(0, 255), 255)) : null;
            var tmpUnique = true;
            tmp$5 = this.balls, tmp$6 = tmp$5.length;
            for (var tmp$7 = 0; tmp$7 !== tmp$6; ++tmp$7) {
              var b2 = tmp$5[tmp$7];
              if (b1.ballCollision_187q7$(b2)) {
                tmpUnique = false;
              }
            }
            if (tmpUnique) {
              this.balls[this.balls.length] = b1;
              isUnique = true;
            }
          }
        }
      },
      randNr_vux9f0$: function (min, max) {
        return Math.random() * (max - min) + min | 0;
      },
      randNr_lu1900$: function (min, max) {
        return Math.random() * (max - min) + min;
      }
    }, /** @lends _.Mainloop */ {
      loop$f: function (this$Mainloop) {
        return function (it) {
          this$Mainloop.loop();
        };
      }
    })
  });
  Kotlin.defineModule('ctcjs', _);
}(Kotlin));
