document.addEventListener('DOMContentLoaded', () => {
  const MENU = document.getElementById('menu')

  function toggleSidebar (e) {
    if (e.target.id === 'menu' && !e.target.classList.contains('act')) {
      e.preventDefault()
      MENU.classList.toggle('act')
    } else MENU.classList.remove('act')
    animation ? stop() : start()
  }

  document.addEventListener('click', toggleSidebar)
  const header = document.getElementById('header')
  const canvas = document.getElementById('canvas')
  canvas.width = header.offsetWidth
  canvas.height = header.offsetHeight
  const c = canvas.getContext('2d')
  window.addEventListener('resize', function () {
    canvas.width = header.offsetWidth
    canvas.height = header.offsetHeight
    init()
    start()
  })

  const colorArray = [
    '#c6d5ff33',
    '#ffffff33',
    '#ffffee33'
  ]

  function Circle (x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.strokeStyle = '#fff'
      c.lineWidth = 0.3
      c.fillStyle = this.color
      c.stroke()
      c.fill()
    }

    this.update = function () {
      if (this.y + this.radius < 0 || this.y - this.radius < 0) {
        this.y = canvas.height
      }
      this.x += (Math.random() * 0.2) * (Math.round(Math.random()) ? 1 : -1)
      this.y -= 0.4
      this.draw()
    }
  }

  let circleArray = []

  function init () {
    circleArray = []
    for (let i = 0; i < 777; ++i) {
      const radius = Math.random() * 7
      const x = Math.random() * (canvas.offsetWidth - radius * 2) + radius
      const y = Math.random() * (canvas.offsetHeight - radius * 2) + radius
      const dx = (Math.random() * 1)
      const dy = (Math.random() * 2)
      circleArray.push(new Circle(x, y, dx, dy, radius))
    }
  }
  init()

  function animate () {
    animation = undefined
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (let i = 0; i < circleArray.length; ++i) {
      circleArray[i].update()
    }
    start()
  }

  let animation
  function start () {
    if (!animation) {
      animation = window.requestAnimationFrame(animate)
    }
  }
  start()

  function stop () {
    if (animation) {
      window.cancelAnimationFrame(animation)
      animation = undefined
    }
  }
})
