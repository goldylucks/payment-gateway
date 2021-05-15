export interface Declined {
  [merchant: string]: { reason: string; count: number }[]
}

export interface AddDeclinedArgs {
  merchant: string
  reason: string
}

export default function makeDeclinedCharges() {
  return (function declinedCharges() {
    const declined = {} as Declined
    return {
      add,
      getByMerchant,
    }

    function add({ merchant, reason }: AddDeclinedArgs) {
      declined[merchant] = declined[merchant] || []
      const reasonObj = declined[merchant].find(obj => obj.reason === reason)
      if (reasonObj) {
        reasonObj.count++
      } else {
        declined[merchant].push({ reason, count: 1 })
      }
    }

    function getByMerchant(merchant: string) {
      return declined[merchant]
    }
  })()
}
