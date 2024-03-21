import {
    CreatePool,
    UpdateFundraisingEndTime
} from "../../types/payableDelegate/OpenFundMarket/OpenFundMarket";

import { createPoolOrderInfo, usePoolOrderInfo } from "./entities";

export function handleCreatePool(event: CreatePool): void {
    // 参数
    let marketAddress = event.address;
    let poolId = event.params.poolId;
    let currency = event.params.currency;
    let poolInfo = event.params.poolInfo_;
    let sft = event.params.sft;

    let vault = poolInfo.vault;
    let poolCurrency = poolInfo.currency;
    let navOracle = poolInfo.navOracle;
    let valueDate = poolInfo.valueDate;
    let permissionless = poolInfo.permissionless;
    let fundraisingAmount = poolInfo.fundraisingAmount;


    let subscribeLimitInfo = poolInfo.subscribeLimitInfo;
    let hardCap = subscribeLimitInfo.hardCap;
    let subscribeMin = subscribeLimitInfo.subscribeMin;
    let subscribeMax = subscribeLimitInfo.subscribeMax;
    let fundraisingStartTime = subscribeLimitInfo.fundraisingStartTime;
    let fundraisingEndTime = subscribeLimitInfo.fundraisingEndTime;

    let poolSFTInfo = poolInfo.poolSFTInfo;
    let openFundShare = poolSFTInfo.openFundShare;
    let openFundRedemption = poolSFTInfo.openFundRedemption;
    let openFundShareSlot = poolSFTInfo.openFundShareSlot;
    let latestRedeemSlot = poolSFTInfo.latestRedeemSlot;

    let poolFeeInfo = poolInfo.poolFeeInfo;
    let carryRate = poolFeeInfo.carryRate;
    let carryCollector = poolFeeInfo.carryCollector;
    let latestProtocolFeeSettleTime = poolFeeInfo.latestProtocolFeeSettleTime;

    let managerInfo = poolInfo.managerInfo;
    let poolManager = managerInfo.poolManager;
    let subscribeNavManager = managerInfo.subscribeNavManager;
    let redeemNavManager = managerInfo.redeemNavManager;

    // 事件的交易、块信息
    let timestamp = event.block.timestamp;
    let txHash = event.transaction.hash;
    let blockNumber = event.block.number;
    let transactionIndex = event.transaction.index;
    let eventIndex = event.logIndex
    let msgSender = event.transaction.from;

    let poolOrderInfo = createPoolOrderInfo(
        marketAddress.toHexString(),
        sft.toHexString(),
        navOracle.toHexString(),
        poolId,
        vault.toHexString(),
        openFundShareSlot,
        fundraisingStartTime,
        fundraisingEndTime
    )

    poolOrderInfo.lastUpdated = timestamp.toI32();
    poolOrderInfo.save();
}

export function handleUpdateFundraisingEndTime(event: UpdateFundraisingEndTime): void {
    // 参数
    let marketAddress = event.address;
    let poolId = event.params.poolId;
    let oldEndTime = event.params.oldEndTime;
    let newEndTime = event.params.newEndTime;

    // 事件的交易、块信息
    let timestamp = event.block.timestamp;
    let txHash = event.transaction.hash;
    let blockNumber = event.block.number;
    let transactionIndex = event.transaction.index;
    let eventIndex = event.logIndex

    let poolOrderInfo = usePoolOrderInfo(marketAddress.toHexString(), poolId.toHexString())
    poolOrderInfo.fundraisingEndTime = newEndTime;
    poolOrderInfo.lastUpdated = timestamp.toI32();
    poolOrderInfo.save();
}