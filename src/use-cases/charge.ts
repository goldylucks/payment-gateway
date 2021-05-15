import { IChargeEntity } from '../types'

// TODO better typing
export default function makeCharge({
  makeChargeEntity,
  processCc,
  declinedCharges,
}: any) {
  return async function charge(body: IChargeEntity, merchant: string) {
    const chargeEntity = makeChargeEntity(body)
    const data = await processCc({
      fullName: chargeEntity.getFullName(),
      creditCardNumber: chargeEntity.getCreditCardNumber(),
      creditCardCompany: chargeEntity.getCreditCardCompany(),
      expirationDate: chargeEntity.getExpirationDate(),
      cvv: chargeEntity.getCvv(),
      amount: chargeEntity.getAmount(),
    })
    if (data?.error) {
      console.log(`adding merchant: ${merchant}, reason: ${data.error}`)
      declinedCharges.add({ merchant, reason: data.error })
    }
    return data
  }
}
