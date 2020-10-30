import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiDualRange,
  EuiButtonEmpty,
  htmlIdGenerator,
} from '@elastic/eui';

export const Timeline = () => {
  const dualValue: [any, any] = [20, 100];

  const levels = [
    {
      min: 0,
      max: 20,
      color: 'danger',
    },
    {
      min: 20,
      max: 100,
      color: 'warning',
    },
  ] as any[];

  return (
    <div>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>0 days</EuiFlexItem>
        <EuiFlexItem grow={false}>90 days</EuiFlexItem>
      </EuiFlexGroup>
      <EuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={() => {}}
        showTicks
        fullWidth
        ticks={[
          { label: '', value: 20 },
          { label: '', value: 100 },
        ]}
        levels={levels}
        aria-label="An example of EuiRange"
        min={0}
        max={100}
      />
      <div style={{ position: 'relative', height: '30px', width: '100%' }}>
        <EuiButtonEmpty size="xs" style={{ position: 'absolute', left: '0%' }}>
          Hot phase
        </EuiButtonEmpty>
        <EuiButtonEmpty size="xs" style={{ position: 'absolute', left: '18%' }}>
          Warm phase
        </EuiButtonEmpty>
        <EuiButtonEmpty size="xs" style={{ position: 'absolute', left: '90%' }}>
          Delete phase
        </EuiButtonEmpty>
      </div>
    </div>
  );
};
