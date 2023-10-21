// import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';
import IRManagerModule from "./IRManagerModule"

export function hasIrBlaster(): boolean {
    return IRManagerModule.hasIrBlaster()
}

type TTransmitProntoCode = [ string, boolean ]
export default function transmitProntoCode(prontoHexCode: string): TTransmitProntoCode {
    return IRManagerModule.transmitProntoCode(prontoHexCode)
}

type TMapCarrier = {
    "maxFrequency": number,
    "minFrequency": number
}
export function getCarrierFrequencies(): [ TMapCarrier[] | string, boolean ] {
    return IRManagerModule.getCarrierFrequencies()
}

export function transmit(carrierFrequency: number, burstPattern: number[]) {
    return IRManagerModule.transmit(carrierFrequency, burstPattern)
}