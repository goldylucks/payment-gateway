import { ICcCompanies } from './cc-companies'

export interface IChargeEntity {
  fullName: string
  creditCardNumber: string
  creditCardCompany: ICcCompanies
  expirationDate: string
  cvv: string
  amount: number
}
