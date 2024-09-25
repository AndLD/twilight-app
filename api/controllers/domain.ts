import { NextFunction, Request, Response } from 'express'
import { twilightcyberServices } from '../services/twilightcyber'

async function post(req: Request, res: Response, nextFn: NextFunction) {
  const { domain, next } = req.body

  try {
    const result = await twilightcyberServices.getDomainInfections(domain, next)

    res.json(result)
  } catch (error) {
    nextFn(error)
  }
}

export const domainControllers = {
  post
}
