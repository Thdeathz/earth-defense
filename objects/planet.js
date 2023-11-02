class Planet extends Sprite {
  constructor(game) {
    super({
      position: { x: game.width / 2, y: game.height / 2 },
      radius: 40,
      scale: 1.3,
      sprites: {
        idle: [
          {
            imageSrc: '../assets/planet/earth.png',
            framesMax: 77,
            offset: { x: 63, y: 63 }
          }
        ]
      }
    })

    this.game = game
    this.color = 'rgba(255, 255, 255, 0.2)'
  }
}
