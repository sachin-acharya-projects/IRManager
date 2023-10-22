# IRManager

### Installation
To install this module, run following command

```shell
npx expo install @sachin-acharya-projects/ir-manager
```

### Usages
This module provides 4 functions.

1. hasIrBlaster()
    - The function checks if your device has build-in IREmitter/IRBlaster and returns boolean value
2. transmitProntoCode(prontoHexCode: string)
    - This function transmit takes prontoHexCode and transmit it using IREmitter. It returns array with message as string and success status as boolean value.
3. getCarrierFrequencies()
    - This function returns array of object with maxFrequency and minFrequency as key.
4. Transmit(carrierFrequency: int, burstPattern: number[])
    - This function transmit burstPattern with carrierFrequency.

```typescript
export function hasIrBlaster(): boolean {
    ...
}

export default function transmitProntoCode(prontoHexCode: string): [string, boolean] {
    ...
}

type TMapCarrier = {
    "maxFrequency": number,
    "minFrequency": number
}
export function getCarrierFrequencies(): [ TMapCarrier[] | string, boolean ] {
    ...
}

export function transmit(carrierFrequency: number, burstPattern: number[]): any {
    ...
}
```

[For code example, checkout this script](./App.tsx)