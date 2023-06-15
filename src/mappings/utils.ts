import { BigInt, Bytes, ethereum, log } from '@graphprotocol/graph-ts'

export let zeroBI = BigInt.fromI32(0)

export let nullAddress = "0x0000000000000000000000000000000000000000"

// 解析bytes格式数据为字符串
export function bytesToTupleString(info: Bytes, bytes: string, struct: string): string {
    let res: string = "{";

    let slotInfoDecode = ethereum.decode(bytes, info)
    if (slotInfoDecode != null) {
        let slotInfoTuples = slotInfoDecode.toTuple();
        let structParmas = struct.split(",");
        for (let i = 0; i < slotInfoTuples.length; i++) {
            if (res !== "{") {
                res = `${res},`;
            }

            res = `${res}"${structParmas[i]}":${kindToDeta(slotInfoTuples[i].kind, slotInfoTuples[i])}`;
        }
    }

    res = `${res}\}`

    return res;
}

// 不同类型的数据解析
function kindToDeta(kind: number, value: ethereum.Value): string {
    let res: string = "";
    if (kind == 0) {
        res = `"${value.toAddress().toHexString()}"`;
    } else if (kind == 1 || kind == 2) {
        res = `"${value.toBytes().toHexString()}"`;
    } else if (kind == 3 || kind == 4) {
        res = `"${value.toBigInt()}"`;
    } else if (kind == 5) {
        res = `"${value.toBoolean()}"`;
    } else if (kind == 6) {
        res = `"${value.toString()}"`;
    } else if (kind == 7) {
        res = value.toAddressArray().toString();
    } else if (kind == 8) {
        let valueString = value.toArray();
        let output = "[";
        for (let i: i32; i < valueString.length; i++) {
            if (output != "[") {
                output = `${output},`;
            }
            output = `${output}${kindToDeta(valueString[i].kind, valueString[i])}`;
        }
        output = `${output}]`;
        res = output;
    } else if (kind == 9) {
        let encode = ethereum.encode(value)!
        res = `"${encode.toHexString()}"`;
    }

    return res;
}