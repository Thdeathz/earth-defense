window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  canvas.width = 1600
  canvas.height = 800

  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  ctx.font = '20px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  document.getElementById('start-btn').onclick = () => {
    document.getElementById('modal').style.display = 'none'
    const backgoundAudio = new Audio('../assets/audio/background.ogg')
    backgoundAudio.play()

    setTimeout(() => {
      startGame(canvas, ctx)
    }, 100)
  }
})

function startGame(canvas, ctx) {
  const game = new Game(canvas)

  let lastTime = 0
  let animationId = null
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animationId = requestAnimationFrame(animate)
    game.render(ctx, deltaTime, animationId)
  }

  requestAnimationFrame(animate)
}
