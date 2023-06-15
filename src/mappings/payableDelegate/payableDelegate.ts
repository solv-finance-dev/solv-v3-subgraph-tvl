import { BondSlotInfo } from "../../types/payableDelegate/schema";
import {
  CreateSlot,
} from "../../types/payableDelegate/templates/Payable/PayableDelegate"
import { JSON } from "assemblyscript-json";

import { createBondSlotInfo } from "./entities"
import { slotInfoToString } from "./utils";
import { log, BigInt } from "@graphprotocol/graph-ts";

export function handleCreateSlot(event: CreateSlot): void {
  let contractAddress = event.address;
  let slot = event.params._slot;
  let creator = event.params._creator;
  let slotInfo = event.params._slotInfo;

  let timestamp = event.block.timestamp;
  let txHash = event.transaction.hash;

  // 解析slot信息为json字符串
  let slotInfoJson = slotInfoToString(contractAddress.toHexString(), slotInfo);
  log.debug("slotInfoJson string {}", [slotInfoJson])
  let jsonObj: JSON.Obj = <JSON.Obj>(JSON.parse(slotInfoJson));

  const valueDate = (<JSON.Str>jsonObj.getString('valueDate')).toString()
  const maturity = (<JSON.Str>jsonObj.getString('maturity')).toString();


  let bondSlotInfo: BondSlotInfo = createBondSlotInfo(
    creator.toHexString(),
    contractAddress.toHexString(),
    slot.toString(),
    BigInt.fromString(valueDate).toI32(),
    BigInt.fromString(maturity).toI32()
  )

  bondSlotInfo.lastUpdated = timestamp.toI32();
  bondSlotInfo.save()
}