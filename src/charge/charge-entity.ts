import { CC_COMPANIES } from '../constants'
import { ICcCompanies, IChargeEntity } from '../types'
// TODO pass through DI
import { validateType } from '../utils'

export default function buildMakeChargeEntity() {
  return function makeCharge(charge: IChargeEntity) {
    validateCharge(charge)

    return Object.freeze({
      getFullName: () => charge.fullName,
      getCreditCardNumber: () => charge.creditCardNumber,
      getCreditCardCompany: () => charge.creditCardCompany,
      getExpirationDate: () => charge.expirationDate,
      getCvv: () => charge.cvv,
      getAmount: () => charge.amount,
    })
  }
}

const validateCharge = (charge: IChargeEntity) => {
  validateFullName(charge.fullName)
  validateCreditCardNumber(charge.creditCardNumber)
  validateCreditCardCompany(charge.creditCardCompany)
  validateExpirationDate(charge.expirationDate)
  validateCvv(charge.cvv)
  validateAmount(charge.amount)
}

const validateFullName = (fullName: string) => {
  if (!fullName) throw new Error('fullName is required')
  validateType({
    argKey: 'fullName',
    argValue: fullName,
    expectedType: 'string',
  })
  const words = fullName.split(' ')
  if (words.length < 2) throw new Error('fullName must have two or more words')
}

const validateCreditCardNumber = (creditCardNumber: string) => {
  if (!creditCardNumber) throw new Error('creditCardNumber is required')
  validateType({
    argKey: 'creditCardNumber',
    argValue: creditCardNumber,
    expectedType: 'string',
  })
  // TODO validate format of number against supported merchants
}

const validateCreditCardCompany = (creditCardCompany: ICcCompanies) => {
  if (!creditCardCompany) throw new Error('creditCardCompany is required')
  validateType({
    argKey: 'creditCardCompany',
    argValue: creditCardCompany,
    expectedType: 'string',
  })
  const isCcCompanySupported = CC_COMPANIES.all.includes(creditCardCompany)
  if (!isCcCompanySupported) {
    const supportedCompanies = CC_COMPANIES.all.join(', ')
    throw new Error(
      `we currently don't support ${creditCardCompany}, we support the following companies: ${supportedCompanies}`
    )
  }
}

const validateExpirationDate = (expirationDate: string) => {
  if (!expirationDate) throw new Error('expirationDate is required')
  validateType({
    argKey: 'expirationDate',
    argValue: expirationDate,
    expectedType: 'string',
  })
  // TODO validate format
}

const validateCvv = (cvv: string) => {
  if (!cvv) throw new Error('cvv is required')
  validateType({
    argKey: 'cvv',
    argValue: cvv,
    expectedType: 'string',
  })
  // TODO validate format
}

const validateAmount = (amount: number) => {
  if (!amount) throw new Error('amount is required')
  validateType({
    argKey: 'amount',
    argValue: amount,
    expectedType: 'number',
  })
  if (amount < 0) throw new Error("amount can't be lower than 0")
}
