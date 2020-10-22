import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '~/config/auth'

interface TokenPayload {
  iat: number
  exp: number
  id: string
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { authorization } = request.headers

  if (!authorization) {
    return response.status(401).json('Token is missing')
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { id } = decoded as TokenPayload

    request.user = {
      id
    }

    return next()
  } catch {
    return response.status(401).json('Token is invalid')
  }
}

export default ensureAuthenticated
