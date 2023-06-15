import {
    NewDelegateBeaconProxy
} from "../../types/payableDelegate/EarnFactory/EarnBeaconFactory"

import {
    Payable as Payabletemplate,
} from "../../types/payableDelegate/templates"
import { createNewDelegate } from "./entities";

export function handleNewDelegateBeaconProxy(event: NewDelegateBeaconProxy): void {
    let beaconProxy = event.params.beaconProxy;

    let newDelegate = createNewDelegate(beaconProxy.toHexString())
    newDelegate.save();

    Payabletemplate.create(beaconProxy);
}