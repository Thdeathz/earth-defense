class Background extends Sprite {
  constructor(game) {
    super({
      position: { x: 0, y: 0 },
      radius: game.width,
      framesHold: 20,
      scale: 2.5,
      sprites: {
        idle: [
          {
            imageSrc: '../assets/background/layer_01.png',
            framesMax: 9,
            offset: { x: 0, y: 0 }
          },
          {
            imageSrc: '../assets/background/layer_02.png',
            framesMax: 9,
            offset: { x: 0, y: 0 }
          },
          {
            imageSrc: '../assets/background/layer_03.png',
            framesMax: 9,
            offset: { x: 0, y: 0 }
          }
        ]
      }
    })
  }
}
