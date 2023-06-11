import { DepositReceived, FundsWithdrawn } from '../generated/Escrow/Escrow'
import { DepositReceived as DepositReceivedEntity, FundsWithdrawn as FundsWithdrawnEntity } from '../generated/schema'

export function handleDepositReceived(event: DepositReceived): void {
  let entity = new DepositReceivedEntity(event.transaction.hash.toHex())
  entity.depositor = event.params.depositor
  entity.amount = event.params.amount
  entity.token = event.params.token
  entity.save()
}

export function handleFundsWithdrawn(event: FundsWithdrawn): void {
  let entity = new FundsWithdrawnEntity(event.transaction.hash.toHex())
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.token = event.params.token
  entity.save()
}
