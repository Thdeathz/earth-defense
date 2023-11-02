class Player extends Sprite {
  constructor(game) {
    super({
      position: { x: game.width / 2, y: game.height / 2 },
      radius: 15,
      scale: 1.2,
      framesHold: 2,
      sprites: {
        idle: [
          {
            imageSrc: '../assets/player/weapon.png',
            framesMax: 12,
            offset: { x: 28, y: 32 }
          },
          {
            imageSrc: '../assets/player/engines.png',
            framesMax: 1,
            offset: { x: 28, y: 24 }
          },
          {
            imageSrc: '../assets/player/engines_effect_idle.png',
            framesMax: 4,
            offset: { x: 28, y: 24 }
          },
          {
            imageSrc: '../assets/player/full_health.png',
            framesMax: 1,
            offset: { x: 28, y: 28 }
          }
        ],
        powering: [
          {
            imageSrc: '../assets/player/weapon.png',
            framesMax: 12,
            offset: { x: 28, y: 32 }
          },
          {
            imageSrc: '../assets/player/engines.png',
            framesMax: 1,
            offset: { x: 28, y: 24 }
          },
          {
            imageSrc: '../assets/player/engines_effect_powering.png',
            framesMax: 4,
            offset: { x: 28, y: 24 }
          },
          {
            imageSrc: '../assets/player/full_health.png',
            framesMax: 1,
            offset: { x: 28, y: 28 }
          }
        ],
        shotEnemy: [
          {
            imageSrc: '../assets/player/weapon.png',
            framesMax: 12,
            offset: { x: 28, y: 32 }
          },
          {
            imageSrc: '../assets/player/engines.png',
            framesMax: 1,
            offset: { x: 28, y: 24 }
          },
          {
            imageSrc: '../assets/player/engines_effect_shoot.png',
            framesMax: 4,
            offset: { x: 28, y: 82 }
          },
          {
            imageSrc: '../assets/player/full_health.png',
            framesMax: 1,
            offset: { x: 28, y: 28 }
          }
        ]
      },
      isRotatable: true
    })

    this.game = game
    this.angle = 0
    this.startShootAnimation = false
    this.shouldAutoMove = true
    this.autoMoveTimeout = null
  }

  hit(damage) {
    this.game.health.lives -= damage
  }

  update() {
    if (this.shouldAutoMove) {
      this.autoMove()
    }

    if (this.currentState === 'powering' || this.currentState === 'idle') {
      this.animateLayer(this.layers[2])
    }

    // show shoot animation
    if (this.startShootAnimation) {
      this.animateFrames(
        [this.layers[0], this.layers[2]],
        [
          () => {
            this.startShootAnimation = false
            this.swapState('powering')
          }
        ]
      )
    }

    // render player score
  }

  shoot(target) {
    this.shouldAutoMove = false

    const aim = this.game.calcAim(target.position, this.game.planet.position)
    this.startShootAnimation = true
    this.swapState('shotEnemy')

    this.position.x =
      this.game.planet.position.x + aim.aimX * (this.game.planet.radius + this.radius + 20)
    this.position.y =
      this.game.planet.position.y + aim.aimY * (this.game.planet.radius + this.radius + 20)
    this.angle = Math.atan2(aim.dy, aim.dx) + Math.PI / 2

    this.update()

    // Clear any existing timeout
    if (this.autoMoveTimeout) {
      clearTimeout(this.autoMoveTimeout)
    }

    // Set new timeout make player move around planet after 2 seconds
    this.autoMoveTimeout = setTimeout(() => {
      this.shouldAutoMove = true
      this.swapState('idle')
    }, 2000)

    const projectile = this.game.getProjectile()
    if (projectile)
      projectile.start(
        {
          x: this.position.x + aim.aimX * 28,
          y: this.position.y + aim.aimY * 24
        },
        { x: aim.aimX, y: aim.aimY },
        target.id
      )
  }

  autoMove() {
    const velocityX = Math.cos(this.angle)
    const velocityY = Math.sin(this.angle)
    this.angle = this.normalizeAngle(this.angle - 0.008)

    this.position.x =
      this.game.planet.position.x + velocityX * (this.game.planet.radius + this.radius + 5)
    this.position.y =
      this.game.planet.position.y + velocityY * (this.game.planet.radius + this.radius + 5)
  }

  // Ensure angle in [0, 2 * Math.PI]
  normalizeAngle(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI
    }
    while (angle >= 2 * Math.PI) {
      angle -= 2 * Math.PI
    }
    return angle
  }
}
