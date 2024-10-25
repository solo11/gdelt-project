import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

export function Segmented({mapStyle}) {
  const [value, setValue] = useState('light');

  return (
    <SegmentedControl
      value={value}
      onChange={(val) => {
        setValue(val)
        mapStyle(val)
      }}
      data={[
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ]}
    />
  );
}