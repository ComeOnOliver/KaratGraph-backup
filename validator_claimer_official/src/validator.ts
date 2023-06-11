import { ValidatorTokenHolder } from "../generated/schema";
import { ClaimerTokenHolder } from "../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import { crypto, Bytes } from "@graphprotocol/graph-ts"

// import { Validator } from "../generated/Validator/Validator";
import {log} from "@graphprotocol/graph-ts";

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

  let validatorTokenHolder = ValidatorTokenHolder.load(event.params.validatorTokenId.toString());
  if (validatorTokenHolder == null) {
    return;
  }
  validatorTokenHolder.totalReferralKaratScore = validatorTokenHolder.totalReferralKaratScore.plus(event.params.claimerKaratScore);;
  validatorTokenHolder.totalReferNumber = validatorTokenHolder.totalReferNumber.plus(BigInt.fromI32(1)); // If the function call was successful, store the returned role in the entity

  validatorTokenHolder.save()

  entity.save()


  let CtokenHolder = ClaimerTokenHolder.load(event.params.lieutenantAddr.toHexString());
  if (CtokenHolder == null) {
    return;
  }
  // let validatorContract = Validator.bind(event.address); // Bind the Claimer contract to the address it's deployed at
  
  // let lieutenantReferNumber = validatorContract.try_lieutenantRefereeCounter(event.params.lieutenantAddr); // Call the try_tokenURI function with the tokenId
  // if (!lieutenantReferNumber.reverted) {
  //   CtokenHolder.referralNumber = lieutenantReferNumber.value; // If the function call was successful, store the returned role in the entity
  // }

  // let lieutenantTotalKaratScoreResult = validatorContract.try_lieutenantKaratScore(event.params.lieutenantAddr); // Call the try_claimerRoles function with the claimer address
  // if (!lieutenantTotalKaratScoreResult.reverted) {
  //   CtokenHolder.totalReferralKaratScore = lieutenantTotalKaratScoreResult.value; // If the function call was successful, store the returned role in the entity
  // }
  CtokenHolder.referralNumber = CtokenHolder.referralNumber.plus(BigInt.fromI32(1)); // If the function call was successful, store the returned role in the entity
  CtokenHolder.totalReferralKaratScore = CtokenHolder.totalReferralKaratScore.plus(event.params.claimerKaratScore); // If the function call was successful, store the returned role in the entity

  CtokenHolder.save();


  // let validatorContract1 = Validator.bind(event.address); // Bind the Claimer contract to the address it's deployed at
  // let validatorTokenHolder = ValidatorTokenHolder.load(tokenId.toHex());
  // if (validatorTokenHolder == null) {
  //   return;
  // }

  // let validatorKaratScore = validatorContract1.try_validatorKaratScore(tokenId); // Call the try_tokenURI function with the tokenId
  // validatorTokenHolder.totalReferralKaratScore = validatorKaratScore.value; // If the function call was successful, store the returned role in the entity
  // log.info('tokenId: {}, with karatScore: {}', [tokenId.toString(), validatorKaratScore.value.toString()]);

  // let validatorTotalReferNumber = validatorContract1.try_validatorRefereeCounter(tokenId); // Call the try_tokenURI function with the tokenId
  // validatorTokenHolder.totalReferNumber = validatorTotalReferNumber.value; // If the function call was successful, store the returned role in the entity

  // validatorTokenHolder.save();

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
  
  let tokenHolder1 = ValidatorTokenHolder.load(event.params.tokenId.toString());
  if (tokenHolder1 == null) {
    return;
  }
  tokenHolder1.owner = event.params.to;
  tokenHolder1.lastTransferTime = event.block.timestamp;
  tokenHolder1.save();
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
  

  let valiTokenHolder = ValidatorTokenHolder.load(event.params.tokenId.toString());
  if (valiTokenHolder == null) {
    valiTokenHolder = new ValidatorTokenHolder(event.params.tokenId.toString());
  }
  valiTokenHolder.tokenId = event.params.tokenId;
  valiTokenHolder.owner = event.params.to;
  valiTokenHolder.tokenURI = `https://api.karatdao.com/nft/validator/${valiTokenHolder.tokenId.toString()}.json`;
  valiTokenHolder.lastTransferTime = event.block.timestamp;
  valiTokenHolder.tier = event.params.tier;
  valiTokenHolder.totalReferNumber = BigInt.fromI32(0);
  valiTokenHolder.totalReferralKaratScore = BigInt.fromI32(0);
  valiTokenHolder.referralLink = `https://karatdao.com/mint/claimer?validatorId=${valiTokenHolder.tokenId.toString()}`;

  valiTokenHolder.save();
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
