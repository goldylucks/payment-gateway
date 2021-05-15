import { CC_COMPANIES } from '../../constants'
import { ICcCompanies, IChargeEntity } from '../../types'
import visaProcessor from './visa-processor'
import mastercardProcessor from './mastercard-processor'

export default function makeCompanyProcessor(
  ccCompany: ICcCompanies
): (body: IChargeEntity) => Promise<any> {
  if (ccCompany === CC_COMPANIES.visa) return visaProcessor
  if (ccCompany === CC_COMPANIES.mastercard) return mastercardProcessor
  throw new Error(`We currently don't support ${ccCompany}`)
}
