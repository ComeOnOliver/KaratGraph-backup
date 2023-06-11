import { ValidatorTokenHolder } from "../generated/schema";

import {
  AdminChanged as AdminChangedEvent,
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  AuthorizedCallerSet as AuthorizedCallerSetEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Initialized as InitializedEvent,
  NewBatchCreated as NewBatchCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PriceChanged as PriceChangedEvent,
  ReferralSet as ReferralSetEvent,
  StageChanged as StageChangedEvent,
  Transfer as TransferEvent,
  Upgraded as UpgradedEvent,
  ValidatorMinted as ValidatorMintedEvent,
  WhitelistMerkleRootUpdated as WhitelistMerkleRootUpdatedEvent
} from "../generated/Validator/Validator"
import {
  AdminChanged,
  Approval,
  ApprovalForAll,
  AuthorizedCallerSet,
  BeaconUpgraded,
  Initialized,
  NewBatchCreated,
  OwnershipTransferred,
  PriceChanged,
  ReferralSet,
  StageChanged,
  Transfer,
  Upgraded,
  ValidatorMinted,
  WhitelistMerkleRootUpdated
} from "../generated/schema"

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuthorizedCallerSet(
  event: AuthorizedCallerSetEvent
): void {
  let entity = new AuthorizedCallerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.caller = event.params.caller
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}


export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewBatchCreated(event: NewBatchCreatedEvent): void {
  let entity = new NewBatchCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tier1Batch = event.params.tier1Batch
  entity.tier2Batch = event.params.tier2Batch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePriceChanged(event: PriceChangedEvent): void {
  let entity = new PriceChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tier1Price = event.params.tier1Price
  entity.tier2Price = event.params.tier2Price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReferralSet(event: ReferralSetEvent): void {
  let entity = new ReferralSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validatorTokenId = event.params.validatorTokenId
  entity.claimerAddr = event.params.claimerAddr
  entity.lieutenantAddr = event.params.lieutenantAddr
  entity.claimerKaratScore = event.params.claimerKaratScore

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleStageChanged(event: StageChangedEvent): void {
  let entity = new StageChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stage = event.params.stage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  //Update holder
  let tokenHolder = ValidatorTokenHolder.load(event.params.tokenId.toString());
  if (tokenHolder == null) {
    tokenHolder = new ValidatorTokenHolder(event.params.tokenId.toString());
    tokenHolder.tokenId = event.params.tokenId;
  }
  tokenHolder.owner = event.params.to;
  tokenHolder.lastTransferTime = event.block.timestamp;
  tokenHolder.save();
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleValidatorMinted(event: ValidatorMintedEvent): void {
  let entity = new ValidatorMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId
  entity.tier = event.params.tier

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWhitelistMerkleRootUpdated(
  event: WhitelistMerkleRootUpdatedEvent
): void {
  let entity = new WhitelistMerkleRootUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.merkleRoot = event.params.merkleRoot

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
