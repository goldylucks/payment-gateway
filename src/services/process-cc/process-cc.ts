import { IChargeEntity } from '../../types'
import makeCompanyProcessor from './make-company-processor'

export default function makeProcessCc({ retry }) {
  return async function processCc(body: IChargeEntity) {
    const companyProcessor = makeCompanyProcessor(body.creditCardCompany)

    // return await companyProcessorWithRetry(body)
    return await retry(
      async () => {
        return await companyProcessor(body)
      },
      {
        retries: 3,
        randomize: false,
        onRetry: (error: Error) =>
          console.log(`Retrying ${companyProcessor.name}, error: ${error}`),
      }
    )
  }
}
