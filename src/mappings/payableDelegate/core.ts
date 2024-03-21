import { Address } from "@graphprotocol/graph-ts";
import { PayableDelegate as PayableDelegate_Contract } from "../../types/payableDelegate/templates/Payable/PayableDelegate"

export function contractType(voucherAddress: Address): string {
    let tokenContract = PayableDelegate_Contract.bind(voucherAddress);
    let result = tokenContract.try_contractType()
    if (!result.reverted) {
        return result.value
    }
    return ""
}