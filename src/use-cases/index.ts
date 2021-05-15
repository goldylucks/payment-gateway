import makeCharge from './charge'
import makeGetChargeStatuses from './get-charge-statuses'
import makeChargeEntity from '../charge'
import { processCc, declinedCharges } from '../services'

const charge = makeCharge({ makeChargeEntity, processCc, declinedCharges })
const getChargeStatuses = makeGetChargeStatuses({ declinedCharges })

const useCases = Object.freeze({ charge, getChargeStatuses })

export default useCases

export { charge, getChargeStatuses }
