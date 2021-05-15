import axios from 'axios'
import { IChargeEntity, IChargeUseCaseResponse } from '../../types'
import { getFirstName, getLastName } from '../../utils'

const mastercardProcessor = async (
  body: IChargeEntity
): Promise<IChargeUseCaseResponse> => {
  try {
    return await tryMastercardProcessor(body)
  } catch (error) {
    return catchMastercardProcessor(error)
  }
}

export default mastercardProcessor

const tryMastercardProcessor = async (
  body: IChargeEntity
): Promise<undefined> => {
  const url = 'https://interview.riskxint.com/mastercard/capture_card'
  await axios.request({
    method: 'POST',
    url,
    headers: {
      identifier: getFirstName(body.fullName),
    },
    data: {
      first_name: getFirstName(body.fullName),
      last_name: getLastName(body.fullName),
      card_number: body.creditCardNumber,
      expiration: body.expirationDate,
      cvv: body.cvv,
      charge_amount: body.amount,
    },
  })
  return undefined
}

const catchMastercardProcessor = (error: any) => {
  if (error.response?.data?.decline_reason) {
    return {
      error: 'Card declined',
    }
  }
  throw error
}
