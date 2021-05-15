import { Request, Response } from 'express'
import { IController, IHttpResponse } from '../types'

export default function makeExpressCallback(controller: IController) {
  return (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        'Merchant-Identifier': req.get('merchant-identifier'),
      },
    }
    controller(httpRequest)
      .then((httpResponse: IHttpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch((error: Error) =>
        res.status(500).send({ error, message: 'An unkown error occurred.' })
      )
  }
}
