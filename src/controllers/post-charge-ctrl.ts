import { IHttpRequest, IChargeUseCase, IChargeEntity } from '../types'

interface makeCtrlArgs {
  charge: IChargeUseCase
}

export default function makePostChargeCtrl({ charge }: makeCtrlArgs) {
  return async function postChargeCtrl(httpRequest: IHttpRequest) {
    try {
      return await tryPostCharge({
        charge,
        body: httpRequest.body,
        merchant: httpRequest.headers['Merchant-Identifier'],
      })
    } catch (error: unknown) {
      return catchPostCharge(error)
    }
  }
}

interface tryArgs {
  charge: IChargeUseCase
  body: IChargeEntity
  merchant: string
}

export const tryPostCharge = async ({ charge, body, merchant }: tryArgs) => {
  const data = await charge(body, merchant)
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: data,
  }
}

export function catchPostCharge(error: unknown) {
  // TODO: Error handling
  console.log(error)

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 400,
    body: {
      error,
      message: 'Error processing charge',
    },
  }
}
