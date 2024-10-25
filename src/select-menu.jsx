
import { useState } from 'react';
import { CheckIcon, Combobox, Group, Input, InputBase, useCombobox } from '@mantine/core';



const data = 
[ {
  name: 'ALL',
 color: '#FFFFF'
},{
  name: 'AFFECT',
  color: '#d90824'
},{
   name: 'ARREST',
  color: '#f77e25'
},{
    name: 'EVACUATION',
   color: '#7d3c98'
 },
 { name: 'KIDNAP',
   color: '#34495e'
 },{name: 'POVERTY',
   color: '#515a5a'
 },{
    name: 'PROTEST',
   color: '#515a5a'
 },
 {  name: 'KILL',
   color: '#e74c3c'
 }, {
    name: 'SEIZE',
   color: '#1a5276'
 },
 {
    name: 'WOUND',
   color: '#641e16'
 }]

export function SelectActive({eventValue}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    },
  });

  const [value, setValue] = useState('ALL');

  const options = data.map((item,i) => (
    <Combobox.Option value={item.name} key={item.name} active={item.name === value}>
      <Group gap="xs">
        {item.name === value && <CheckIcon size={12} />}

        <div  style={{backgroundColor:item.color, height:'12px', width:'12px',borderRadius:'5px'}}></div>
        <span >{item.name}</span>

      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        
        eventValue(val)
        console.log(val)
        combobox.updateSelectedOptionIndex('active');
      }}
    >
      <Combobox.Target targetType="button">
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}