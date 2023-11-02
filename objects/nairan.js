class Nairan extends Enemy {
  constructor(game, id) {
    super({
      game,
      id: id,
      radius: 35,
      damage: 1,
      scale: 1.2,
      speed: 0.3,
      framesHold: 11,
      keyword: randomString(2, 2),
      sprites: {
        idle: [
          {
            imageSrc: '../assets/enemy/nairan_engine.png',
            framesMax: 8,
            offset: { x: 75, y: 65 }
          },
          {
            imageSrc: '../assets/enemy/nairan.png',
            framesMax: 34,
            offset: { x: 75, y: 65 }
          }
        ],
        dead: [
          {
            imageSrc: '../assets/enemy/nairan_dead.png',
            framesMax: 18,
            offset: { x: 75, y: 65 }
          }
        ],
        shield: [
          {
            imageSrc: '../assets/enemy/nairan_shield.png',
            framesMax: 8,
            offset: { x: 75, y: 77 }
          },
          {
            imageSrc: '../assets/enemy/nairan_engine.png',
            framesMax: 8,
            offset: { x: 75, y: 77 }
          },
          {
            imageSrc: '../assets/enemy/nairan.png',
            framesMax: 34,
            offset: { x: 75, y: 77 }
          }
        ]
      }
    })

    this.aim
    this.angle = 0
    this.maxLives = 2
  }

  visibile(ctx) {
    if (!this.free) {
      this.draw(ctx)
      ctx.fillStyle = this.color
      ctx.save()
      ctx.fillText(this.keyword, this.position.x, this.position.y)
      ctx.restore()
    }
  }

  start() {
    this.free = false
    this.swapState('shield')

    this.randomSpawn()
  }

  hit(damage) {
    this.lives -= damage

    if (this.lives < this.maxLives) this.swapState('idle')

    if (this.lives < 1) {
      this.audios.death.play()
    } else {
      this.audios.hit.play()
    }
  }

  update() {
    if (!this.free) this.collisionLogic()

    if (this.currentState === 'shield') {
      this.animateFrames(this.sprites.shield)
    }

    if (this.currentState === 'idle') {
      this.animateFrames(this.sprites.idle)
    }

    // check if enemy is dead show animation
    if (this.lives < 1) {
      this.velocity = { x: 0, y: 0 }
      this.swapState('dead')
      this.animateLayer(this.layers[0], () => {
        this.reset()
      })
    }
  }

  swapState(newState) {
    if (this.currentState !== newState) {
      switch (newState) {
        case 'idle':
          this.layers = this.sprites.idle
          this.currentState = 'idle'
          this.radius = 35
          break
        case 'shield':
          this.layers = this.sprites.shield
          this.currentState = 'shield'
          this.radius = 72
          break
        case 'dead':
          this.layers = this.sprites.dead
          this.currentState = 'dead'
          this.radius = 35
          this.framesHold = 5
          break
        default:
          break
      }
    }
  }
}
