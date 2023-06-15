import {
    NewBeaconProxy
} from "../../types/payableDelegate/PayableFactory/PayableDelegateFactory"

import {
    Payable as Payableemplate,
} from "../../types/payableDelegate/templates"

export function handleNewBeaconProxy(event: NewBeaconProxy): void {
    let beaconProxy = event.params.beaconProxy;
    // 创建template
    Payableemplate.create(beaconProxy);
}