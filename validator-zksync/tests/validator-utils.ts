import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  Approval,
  ApprovalForAll,
  AuthorizedCallerSet,
  BaseURIUpdated,
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
} from "../generated/Validator/Validator"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createAuthorizedCallerSetEvent(
  caller: Address,
  status: boolean
): AuthorizedCallerSet {
  let authorizedCallerSetEvent = changetype<AuthorizedCallerSet>(newMockEvent())

  authorizedCallerSetEvent.parameters = new Array()

  authorizedCallerSetEvent.parameters.push(
    new ethereum.EventParam("caller", ethereum.Value.fromAddress(caller))
  )
  authorizedCallerSetEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )

  return authorizedCallerSetEvent
}

export function createBaseURIUpdatedEvent(baseURI: string): BaseURIUpdated {
  let baseUriUpdatedEvent = changetype<BaseURIUpdated>(newMockEvent())

  baseUriUpdatedEvent.parameters = new Array()

  baseUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("baseURI", ethereum.Value.fromString(baseURI))
  )

  return baseUriUpdatedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewBatchCreatedEvent(
  tier1Batch: BigInt,
  tier2Batch: BigInt
): NewBatchCreated {
  let newBatchCreatedEvent = changetype<NewBatchCreated>(newMockEvent())

  newBatchCreatedEvent.parameters = new Array()

  newBatchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tier1Batch",
      ethereum.Value.fromUnsignedBigInt(tier1Batch)
    )
  )
  newBatchCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tier2Batch",
      ethereum.Value.fromUnsignedBigInt(tier2Batch)
    )
  )

  return newBatchCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPriceChangedEvent(
  tier1Price: BigInt,
  tier2Price: BigInt
): PriceChanged {
  let priceChangedEvent = changetype<PriceChanged>(newMockEvent())

  priceChangedEvent.parameters = new Array()

  priceChangedEvent.parameters.push(
    new ethereum.EventParam(
      "tier1Price",
      ethereum.Value.fromUnsignedBigInt(tier1Price)
    )
  )
  priceChangedEvent.parameters.push(
    new ethereum.EventParam(
      "tier2Price",
      ethereum.Value.fromUnsignedBigInt(tier2Price)
    )
  )

  return priceChangedEvent
}

export function createReferralSetEvent(
  validatorTokenId: BigInt,
  claimerAddr: Address,
  lieutenantAddr: Address,
  claimerKaratScore: BigInt
): ReferralSet {
  let referralSetEvent = changetype<ReferralSet>(newMockEvent())

  referralSetEvent.parameters = new Array()

  referralSetEvent.parameters.push(
    new ethereum.EventParam(
      "validatorTokenId",
      ethereum.Value.fromUnsignedBigInt(validatorTokenId)
    )
  )
  referralSetEvent.parameters.push(
    new ethereum.EventParam(
      "claimerAddr",
      ethereum.Value.fromAddress(claimerAddr)
    )
  )
  referralSetEvent.parameters.push(
    new ethereum.EventParam(
      "lieutenantAddr",
      ethereum.Value.fromAddress(lieutenantAddr)
    )
  )
  referralSetEvent.parameters.push(
    new ethereum.EventParam(
      "claimerKaratScore",
      ethereum.Value.fromUnsignedBigInt(claimerKaratScore)
    )
  )

  return referralSetEvent
}

export function createStageChangedEvent(stage: i32): StageChanged {
  let stageChangedEvent = changetype<StageChanged>(newMockEvent())

  stageChangedEvent.parameters = new Array()

  stageChangedEvent.parameters.push(
    new ethereum.EventParam(
      "stage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(stage))
    )
  )

  return stageChangedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createValidatorMintedEvent(
  to: Address,
  tokenId: BigInt,
  tier: BigInt
): ValidatorMinted {
  let validatorMintedEvent = changetype<ValidatorMinted>(newMockEvent())

  validatorMintedEvent.parameters = new Array()

  validatorMintedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  validatorMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  validatorMintedEvent.parameters.push(
    new ethereum.EventParam("tier", ethereum.Value.fromUnsignedBigInt(tier))
  )

  return validatorMintedEvent
}

export function createWhitelistMerkleRootUpdatedEvent(
  merkleRoot: Bytes
): WhitelistMerkleRootUpdated {
  let whitelistMerkleRootUpdatedEvent = changetype<WhitelistMerkleRootUpdated>(
    newMockEvent()
  )

  whitelistMerkleRootUpdatedEvent.parameters = new Array()

  whitelistMerkleRootUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )

  return whitelistMerkleRootUpdatedEvent
}
