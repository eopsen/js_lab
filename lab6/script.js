const canvas = document.getElementById("playground")
const ballsCount = document.getElementById("ballsCount")
const len = document.getElementById("len")
const fpsConunter = document.getElementById("fps")

ballsCount.addEventListener('change', onBallsCountChange)
len.addEventListener('change', onLengthChange)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let canvasCtx = canvas.getContext("2d")
canvasCtx.fillStyle = "black"
let balls = []
let size = 10
let threshold = innerWidth * 1 / 5
let reqanimationreference

function addBalls() {
  threshold = innerWidth * len.value / 100
  balls = []
  for (var i = 0; i < ballsCount.value; i++) {
    var x = Math.random() * (canvas.width - size * 2) + size
    var y = Math.random() * (canvas.height - size * 2) + size
    var dx = Math.floor(Math.random() * -10)
    var dy = Math.floor(Math.random() * 10)
    var ball = { x: x, y: y, dx: dx, dy: dy }
    balls.push(ball)
  }
}

function start() {
  cancelAnimation()
  addBalls()
  draw()
}

function cancelAnimation() {
  if (reqanimationreference) {
    cancelAnimationFrame(reqanimationreference)
    reqanimationreference = null
  }

  clearCanvas()
}

function clearCanvas() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
}

function draw() {
  clearCanvas()
  drawBalls()
  drawLines()
  reqanimationreference = requestAnimationFrame(draw)
}

function drawBalls() {
  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i]
    canvasCtx.beginPath()
    canvasCtx.arc(ball.x, ball.y, size, 0, 2 * Math.PI)
    canvasCtx.fill()
    ball.x += ball.dx
    ball.y += ball.dy
    if (ball.x + size > canvas.width || ball.x - size < 0) {
      ball.dx = -ball.dx
    }
    if (ball.y + size > canvas.height || ball.y - size < 0) {
      ball.dy = -ball.dy
    }
  }
}

function drawLines() {
  for (var i = 0; i < balls.length; i++) {
    for (var j = i + 1; j < balls.length; j++) {
      var distance = Math.sqrt(Math.pow(balls[i].x - balls[j].x, 2) + Math.pow(balls[i].y - balls[j].y, 2))
      if (distance < threshold) {
        canvasCtx.beginPath()
        canvasCtx.moveTo(balls[i].x, balls[i].y)
        canvasCtx.lineTo(balls[j].x, balls[j].y)
        canvasCtx.stroke()
      }
    }
  }
}

function stop() {
  cancelAnimation()
}

function reset() {
  stop()
  start()
}

function onBallsCountChange() {
  document.getElementById("balls").innerHTML = "Balls:" + ballsCount.value
}

function onLengthChange() {
  document.getElementById("length").innerHTML = "Length:" + len.value + "%"
}

function fpsMeter() {
  let prevTime = Date.now(),
    frames = 0;

  requestAnimationFrame(function loop() {
    const time = Date.now();
    frames++;
    if (time > prevTime + 1000) {
      let fps = Math.round((frames * 1000) / (time - prevTime));
      prevTime = time;
      frames = 0;

      fpsConunter.innerHTML = fps + ' fps'
    }

    requestAnimationFrame(loop);
  });
}

fpsMeter();
