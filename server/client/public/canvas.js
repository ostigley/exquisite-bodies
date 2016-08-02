const canvas = document.querySelectorAll('canvas')

for (i=0; i<canvas.length; i++) {
	canvas[i].addEventListener('mouseover', (e) => (
		initiate(e.path[0])
	))
}
 
var initiate = (canvas) => {


	let ctx = canvas.getContext("2d")
	let w = canvas.width
	let h = canvas.height

	var mouse = {x: 0, y: 0}

	canvas.addEventListener('mousemove', (e) => {
		mouse.x = e.pageX - canvas.offsetLeft
		mouse.y = e.pageY - canvas.offsetTop
	}, false)

  ctx.strokeStyle= 'black'
	ctx.lineJoin = 'round'
	ctx.lineWidth = 5
	ctx.lineCap = 'round'

	canvas.addEventListener('mousedown', (e) => {
		ctx.beginPath()
		ctx.moveTo(mouse.x, mouse.y)


		canvas.addEventListener('mousemove', onPaint, false)
	}, false)

	canvas.addEventListener('mouseup', (e) => {
		canvas.removeEventListener('mousemove', onPaint, false)
	}, false)

	canvas.addEventListener('mouseleave', (e) => {
		canvas.removeEventListener('mousemove', onPaint, false)
	}, false)

	var onPaint = () => {
		ctx.lineTo(mouse.x, mouse.y)
		ctx.stroke()
	}

}