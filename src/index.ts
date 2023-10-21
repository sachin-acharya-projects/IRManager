import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to IRManager.web.ts
// and on native platforms to IRManager.ts
import IRManagerModule from './IRManagerModule';
import IRManagerView from './IRManagerView';
import { ChangeEventPayload, IRManagerViewProps } from './IRManager.types';

// Get the native constant value.
export const PI = IRManagerModule.PI;

export function hello(): string {
  return IRManagerModule.hello();
}

export async function setValueAsync(value: string) {
  return await IRManagerModule.setValueAsync(value);
}

const emitter = new EventEmitter(IRManagerModule ?? NativeModulesProxy.IRManager);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { IRManagerView, IRManagerViewProps, ChangeEventPayload };
