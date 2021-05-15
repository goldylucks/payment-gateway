// TODO better typings
export interface IHttpRequest {
  body: any
  query: any
  params: any
  ip: any
  method: any
  path: any
  headers: {
    'Content-Type': string
    Referer: any
    'User-Agent': string
    'Merchant-Identifier': string
  }
}

export interface IHttpResponse {
  headers: {
    'Content-Type': string
  }
  statusCode: number
  body: any
}

export type IController = (httpRequest: IHttpRequest) => Promise<IHttpResponse>
