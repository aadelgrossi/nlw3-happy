import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '~/config/auth'

interface TokenPayload {
  id: string
}

const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json('Authorization is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { id } = decoded as TokenPayload

    request.user = {
      id
    }

    return next()
  } catch (err) {
    return response.status(401).json(err.message)
  }
}

export default ensureAuthenticated
