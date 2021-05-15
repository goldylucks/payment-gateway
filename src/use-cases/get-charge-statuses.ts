// TODO better typing
export default function makeGetChargeStatuses({ declinedCharges }: any) {
  return function getChargeStatuses(merchant: string) {
    return declinedCharges.getByMerchant(merchant)
  }
}
