import {
    BondSlotInfo,
    NewDelegateAddress,
    PoolOrderInfo,
} from '../../types/payableDelegate/schema'
import { BigInt, Bytes, log } from '@graphprotocol/graph-ts'

export let zeroBI = BigInt.fromI32(0)
// 记录SlotInfo
export function createBondSlotInfo(
    msgSender: string,
    contractAddress: string,
    slot: string,
    valueDate: i32,
    maturity: i32
): BondSlotInfo {
    let slotInfoId = contractAddress.concat('-').concat(slot)

    let bondSlotInfo = new BondSlotInfo(slotInfoId);
    bondSlotInfo.msgSender = msgSender;
    bondSlotInfo.contractAddress = contractAddress;
    bondSlotInfo.slot = slot;
    bondSlotInfo.valueDate = valueDate;
    bondSlotInfo.maturity = maturity;

    return bondSlotInfo as BondSlotInfo;
}

// 记录PoolOrderInfo
export function createPoolOrderInfo(
    marketContractAddress: string,
    contractAddress: string,
    navOracle: string,
    poolId: Bytes,
    vault: string,
    openFundShareSlot: BigInt,
    fundraisingStartTime: BigInt,
    fundraisingEndTime: BigInt,
): PoolOrderInfo {
    let poolOrderInfoId = marketContractAddress.concat('-').concat(poolId.toHexString());
    let poolOrderInfo = new PoolOrderInfo(poolOrderInfoId);
    poolOrderInfo.marketContractAddress = marketContractAddress;
    poolOrderInfo.contractAddress = contractAddress;
    poolOrderInfo.navOracle = navOracle;
    poolOrderInfo.poolId = poolId;
    poolOrderInfo.vault = vault;
    poolOrderInfo.openFundShareSlot = openFundShareSlot;
    poolOrderInfo.fundraisingStartTime = fundraisingStartTime;
    poolOrderInfo.fundraisingEndTime = fundraisingEndTime;

    return poolOrderInfo as PoolOrderInfo;
}

export function usePoolOrderInfo(
    marketContractAddress: string,
    poolId: string
): PoolOrderInfo {
    let poolOrderInfoId = marketContractAddress.concat('-').concat(poolId);
    let poolOrderInfo = PoolOrderInfo.load(poolOrderInfoId)!
    return poolOrderInfo as PoolOrderInfo;
}

// eran new
export function createNewDelegate(contractAddress: string): NewDelegateAddress {
    let newDelegateAddress = new NewDelegateAddress(contractAddress);

    return newDelegateAddress as NewDelegateAddress;
}