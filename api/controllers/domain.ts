import { NextFunction, Request, Response } from 'express'
import { twilightcyberServices } from '../services/twilightcyber'
import fs from 'fs'

async function post(req: Request, res: Response, nextFn: NextFunction) {
  const { domain, next } = req.body

  try {
    const result = await twilightcyberServices.getDomainInfections(domain, next)
    // TODO: Remove mock
    // const result = JSON.parse(fs.readFileSync(__dirname + '/../mock.json').toString()).data

    res.json(result)
  } catch (error) {
    nextFn(error)
  }
}

export const domainControllers = {
  post
}
