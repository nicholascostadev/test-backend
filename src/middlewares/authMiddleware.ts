import {  RequestHandler } from 'express'

const supersecretToken = '123456'

export const authMiddleware: RequestHandler = (req  ,res, next) => {
	const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send('No token provided')

	const token = authHeader.split(' ')[1]
	if (token !== supersecretToken) return res.status(401).send('Invalid token')

	next()
}