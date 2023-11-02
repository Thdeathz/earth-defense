class Asteroid extends Enemy {
  constructor(game, id) {
    super({
      game,
      id: id,
      radius: 18,
      damage: 1,
      scale: 1.2,
      speed: 0.6,
      framesHold: 6,
      keyword: randomString(1, 1),
      sprites: {
        idle: [
          {
            imageSrc: '../assets/enemy/asteroid.png',
            framesMax: 8,
            offset: { x: 57, y: 57 }
          }
        ]
      }
    })

    this.maxLives = 1
  }
}
