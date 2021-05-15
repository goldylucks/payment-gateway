// TODO pass through DI
import axios from 'axios'
import { IChargeEntity, IChargeUseCaseResponse } from '../../types'
import { getFirstName } from '../../utils'

const visaProcessor = async (
  body: IChargeEntity
): Promise<IChargeUseCaseResponse> => {
  const url = 'https://interview.riskxint.com/visa/api/chargeCard'
  const { data } = await axios.request({
    method: 'POST',
    url,
    headers: {
      identifier: getFirstName(body.fullName),
    },
    data: {
      fullName: body.fullName,
      number: body.creditCardNumber,
      expiration: body.expirationDate,
      cvv: body.cvv,
      totalAmount: body.amount,
    },
  })
  if (data.chargeResult === 'Failure') {
    return {
      error: 'Card declined',
    }
  }
  return undefined
}

export default visaProcessor
