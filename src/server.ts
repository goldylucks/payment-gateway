import express from 'express'
import bodyParser from 'body-parser'
import makeExpressCallback from './express-callback'
import { postChargeCtrl, getChargeStatusesCtrl } from './controllers'

const PORT = process.env.PORT || 8000
const API_ROOT = '/api'

const app = express()

app.use(bodyParser.json())
app.post(`${API_ROOT}/charge`, makeExpressCallback(postChargeCtrl))
app.get(
  `${API_ROOT}/chargeStatuses`,
  makeExpressCallback(getChargeStatusesCtrl)
)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
