import {ClaimerTokenHolder} from "../generated/schema";
import {Claimer} from "../generated/Claimer/Claimer";
import {BigInt} from "@graphprotocol/graph-ts";


import {
    AdminChanged as AdminChangedEvent,
    Approval as ApprovalEvent,
    ApprovalForAll as ApprovalForAllEvent,
    BeaconUpgraded as BeaconUpgradedEvent,
    ClaimerMinted as ClaimerMintedEvent,
    Initialized as InitializedEvent,
    Paused as PausedEvent,
    RoleAdminChanged as RoleAdminChangedEvent,
    RoleGranted as RoleGrantedEvent,
    RoleRevoked as RoleRevokedEvent,
    Transfer as TransferEvent,
    Unpaused as UnpausedEvent,
    UpdateMaxScore as UpdateMaxScoreEvent,
    Upgraded as UpgradedEvent
} from "../generated/Claimer/Claimer"
import {
    AdminChanged,
    Approval,
    ApprovalForAll,
    BeaconUpgraded,
    ClaimerMinted,
    Initialized,
    Paused,
    RoleAdminChanged,
    RoleGranted,
    RoleRevoked,
    Transfer,
    Unpaused,
    UpdateMaxScore,
    Upgraded
} from "../generated/schema"

export function handleAdminChanged(event : AdminChangedEvent): void {
    let entity = new AdminChanged(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.previousAdmin = event.params.previousAdmin
    entity.newAdmin = event.params.newAdmin

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleApproval(event : ApprovalEvent): void {
    let entity = new Approval(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.owner = event.params.owner
    entity.approved = event.params.approved
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleApprovalForAll(event : ApprovalForAllEvent): void {
    let entity = new ApprovalForAll(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.owner = event.params.owner
    entity.operator = event.params.operator
    entity.approved = event.params.approved

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}


export function handleBeaconUpgraded(event : BeaconUpgradedEvent): void {
    let entity = new BeaconUpgraded(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.beacon = event.params.beacon

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleClaimerMinted(event : ClaimerMintedEvent): void {
    let entity = new ClaimerMinted(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.claimer = event.params.claimer
    entity.tokenId = event.params.tokenId
    entity.validatorTokenId = event.params.validatorTokenId
    entity.karatScore = event.params.karatScore
    entity.lieutenantAddr = event.params.lieutenantAddr
    entity.role = event.params.role

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
    // Update holder
    let tokenHolder = ClaimerTokenHolder.load(event.params.claimer.toHexString());
    if (tokenHolder == null) {
        tokenHolder = new ClaimerTokenHolder(event.params.claimer.toHexString());
    }
    tokenHolder.tokenId = event.params.tokenId;
    tokenHolder.owner = event.params.claimer;
    tokenHolder.lastTransferTime = event.block.timestamp;

    let contract = Claimer.bind(event.address); // Bind the Claimer contract to the address it's deployed at
    let result = contract.try_tokenURI(entity.tokenId); // Call the try_tokenURI function with the tokenId

    if (! result.reverted) {
        tokenHolder.tokenURI = result.value; // If the function call was successful, store the returned tokenURI in the entity
    } else {
        tokenHolder.tokenURI = ""; // If the function call reverted, store null (or any other value that makes sense in your case)
    }
    let roleResult = contract.try_claimerRoles(event.params.claimer); // Call the try_claimerRoles function with the claimer address

    if (! roleResult.reverted) {
        tokenHolder.role = BigInt.fromI32(roleResult.value); // If the function call was successful, store the returned role in the entity
    } else {
        tokenHolder.role = BigInt.fromI32(99); // If the function call reverted, store 99
    }

    let karatScoreResult = contract.try_karatScoresList(event.params.claimer); // Call the try_claimerRoles function with the claimer address

    if (! karatScoreResult.reverted) {
        tokenHolder.karatScore = karatScoreResult.value; // If the function call was successful, store the returned role in the entity
    } else {
        tokenHolder.karatScore = BigInt.fromI32(0); // If the function call reverted, store zero
    } 
    tokenHolder.referralNumber = BigInt.fromI32(0);
    tokenHolder.totalReferralKaratScore = BigInt.fromI32(0);
    tokenHolder.lieutenantAddr = event.params.lieutenantAddr;
    tokenHolder.validatorTokenId = event.params.validatorTokenId;
    tokenHolder.referralLink = `https://karatdao.com/mint/claimer?lieutenantAddress=${tokenHolder.owner.toHexString()}&validatorId=${tokenHolder.validatorTokenId.toString()}`;
    tokenHolder.save();
}

export function handleInitialized(event : InitializedEvent): void {
    let entity = new Initialized(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.version = event.params.version

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handlePaused(event : PausedEvent): void {
    let entity = new Paused(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.account = event.params.account

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleRoleAdminChanged(event : RoleAdminChangedEvent): void {
    let entity = new RoleAdminChanged(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.role = event.params.role
    entity.previousAdminRole = event.params.previousAdminRole
    entity.newAdminRole = event.params.newAdminRole

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleRoleGranted(event : RoleGrantedEvent): void {
    let entity = new RoleGranted(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.role = event.params.role
    entity.account = event.params.account
    entity.sender = event.params.sender

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleRoleRevoked(event : RoleRevokedEvent): void {
    let entity = new RoleRevoked(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.role = event.params.role
    entity.account = event.params.account
    entity.sender = event.params.sender

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleTransfer(event : TransferEvent): void {
    let entity = new Transfer(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.from = event.params.from
    entity.to = event.params.to
    entity.tokenId = event.params.tokenId

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleUnpaused(event : UnpausedEvent): void {
    let entity = new Unpaused(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.account = event.params.account

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleUpdateMaxScore(event : UpdateMaxScoreEvent): void {
    let entity = new UpdateMaxScore(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.maxScore = event.params.maxScore

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}

export function handleUpgraded(event : UpgradedEvent): void {
    let entity = new Upgraded(event.transaction.hash.concatI32(event.logIndex.toI32()))
    entity.implementation = event.params.implementation

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.save()
}
