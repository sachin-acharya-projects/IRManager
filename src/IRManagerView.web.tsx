import * as React from 'react';

import { IRManagerViewProps } from './IRManager.types';

export default function IRManagerView(props: IRManagerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
