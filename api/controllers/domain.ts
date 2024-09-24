import { Request, Response } from 'express'
import { twilightcyberServices } from '../services/twilightcyber'

async function post(req: Request, res: Response) {
  const { domain, next } = req.body

  const result = await twilightcyberServices.getDomainInfections(domain, next)

  res.json(result)
}

export const domainControllers = {
  post
}
