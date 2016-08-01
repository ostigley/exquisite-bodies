import express from 'express'

export const startServer  = () => {
	const app = express()
	app.use(express.static('public'))
	app.listen(3000, () => console.log('Server running on 3000'))
} 

