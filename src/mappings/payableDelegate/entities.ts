import {
    BondSlotInfo,
    NewDelegateAddress,
} from '../../types/payableDelegate/schema'
import { BigInt, log } from '@graphprotocol/graph-ts'

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

// eran new
export function createNewDelegate(contractAddress: string): NewDelegateAddress {
    let newDelegateAddress = new NewDelegateAddress(contractAddress);

    return newDelegateAddress as NewDelegateAddress;
}