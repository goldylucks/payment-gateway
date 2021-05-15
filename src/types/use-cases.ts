import { IChargeEntity } from './entities'

export type IChargeUseCase = (
  body: IChargeEntity,
  merchant: string
) => Promise<undefined>
export type IChargeUseCaseResponse =
  | undefined
  | {
      error: string
    }

export interface ChargeStatus {
  reason: string
  count: number
}
export type IGetChargeStatusesUseCase = (
  merchant: string
) => Promise<ChargeStatus[]>
