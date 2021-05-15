import makePostChargeCtrl from './post-charge-ctrl'
import makeGetChargeStatusesCtrl from './get-charge-statuses-ctrl'

import { charge, getChargeStatuses } from '../use-cases'

const postChargeCtrl = makePostChargeCtrl({ charge })
const getChargeStatusesCtrl = makeGetChargeStatusesCtrl({ getChargeStatuses })

const controllers = Object.freeze({ postChargeCtrl, getChargeStatusesCtrl })

export default controllers

export { postChargeCtrl, getChargeStatusesCtrl }
