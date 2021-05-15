import { IGetChargeStatusesUseCase, IHttpRequest } from '../types'

interface makeCtrlArgs {
  getChargeStatuses: IGetChargeStatusesUseCase
}

export default function makeGetChargeStatusesCtrl({
  getChargeStatuses,
}: makeCtrlArgs) {
  return async function getChargeStatusesCtrl(httpRequest: IHttpRequest) {
    try {
      return await tryGetChargeStatuses({
        getChargeStatuses,
        merchant: httpRequest.headers['Merchant-Identifier'],
      })
    } catch (error: unknown) {
      return catchGetChargeStatuses(error)
    }
  }
}

interface tryArgs {
  getChargeStatuses: IGetChargeStatusesUseCase
  merchant: string
}

export const tryGetChargeStatuses = async ({
  getChargeStatuses,
  merchant,
}: tryArgs) => {
  const data = await getChargeStatuses(merchant)
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: data,
  }
}

export function catchGetChargeStatuses(error: unknown) {
  // TODO: Error handling
  console.log(error)

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 400,
    body: {
      error,
      message: 'Error getting charge statuses',
    },
  }
}
