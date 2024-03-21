import {
    NewDelegateBeaconProxy
} from "../../types/payableDelegate/EarnFactory/EarnBeaconFactory"

import { contractType as getContractType } from "./core"

import {
    Payable as Payabletemplate,
} from "../../types/payableDelegate/templates"
import { createNewDelegate } from "./entities";
import { log } from "@graphprotocol/graph-ts";

export function handleNewDelegateBeaconProxy(event: NewDelegateBeaconProxy): void {
    let beaconProxy = event.params.beaconProxy;

    let contractType = getContractType(beaconProxy)
    log.debug("handleNewDelegateBeaconProxy contractType {}",[contractType])
    let newDelegate = createNewDelegate(beaconProxy.toHexString())
    newDelegate.save();

    if (contractType == "Closed-end Fund") {
        Payabletemplate.create(beaconProxy);
    }

}