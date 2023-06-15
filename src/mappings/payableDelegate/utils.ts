import { BigInt, Bytes, ethereum, json, log } from '@graphprotocol/graph-ts'
import { NewDelegateAddress } from '../../types/payableDelegate/schema';
import { bytesToTupleString } from '../utils';
import { JSON } from "assemblyscript-json";

// 解析bytes格式的slotInfo为string
export function slotInfoToString(contractAddress: string, slotInfo: Bytes): string {
    let newDelegate = NewDelegateAddress.load(contractAddress)
    let res = "";
    if (newDelegate) {
        let bytes = "(address,address,uint256,unit8,int32,uint64,uint64,uint64,bool,string)";
        let struct = "currency,supervisor,issueQuota,interestType,interestRate,valueDate,maturity,createTime,transferable,externalURI";

        res = bytesToTupleString(slotInfo, bytes, struct);
    } else {
        let bytes = "(address,uint256,uint32,uint64,uint64,bool,string)";
        let struct = "currency,issueQuota,interestRate,valueDate,maturity,transferable,externalURI";

        res = bytesToTupleString(slotInfo, bytes, struct);
    }

    return res
}