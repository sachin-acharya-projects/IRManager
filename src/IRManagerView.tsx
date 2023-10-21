import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { IRManagerViewProps } from './IRManager.types';

const NativeView: React.ComponentType<IRManagerViewProps> =
  requireNativeViewManager('IRManager');

export default function IRManagerView(props: IRManagerViewProps) {
  return <NativeView {...props} />;
}
